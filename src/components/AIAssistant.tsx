import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Initialize the Azure AI configuration from .env file
// Accessing environment variables with Vite's import.meta.env
const AZURE_API_KEY = import.meta.env.VITE_AZURE_API_KEY;
const AZURE_ENDPOINT = import.meta.env.VITE_AZURE_ENDPOINT;
const AZURE_DEPLOYMENT = import.meta.env.VITE_AZURE_DEPLOYMENT || "grok-3"; // Default to grok-3 for text generation

// DALL-E image generation configuration
const AZURE_DALLE_DEPLOYMENT = import.meta.env.VITE_AZURE_DALLE_DEPLOYMENT || "dall-e-3"; // Default to dall-e-3 for image generation
const AZURE_DALLE_ENDPOINT = import.meta.env.VITE_AZURE_DALLE_ENDPOINT || 
  (AZURE_ENDPOINT ? `${AZURE_ENDPOINT}/openai/deployments/${AZURE_DALLE_DEPLOYMENT}/images/generations?api-version=2024-02-01` : '');
const AZURE_DALLE_API_KEY = import.meta.env.VITE_AZURE_DALLE_API_KEY || AZURE_API_KEY; // Use the same API key if not specified separately

// For development, log if essential environment variables are missing
if (import.meta.env.DEV) {
  const missingEnvVars = [];
  if (!AZURE_API_KEY) missingEnvVars.push("VITE_AZURE_API_KEY");
  if (!AZURE_ENDPOINT) missingEnvVars.push("VITE_AZURE_ENDPOINT");
  if (!AZURE_DEPLOYMENT) missingEnvVars.push("VITE_AZURE_DEPLOYMENT");
  
  if (missingEnvVars.length > 0) {
    console.warn(
      "Missing Azure AI environment variables. Make sure you've set up your .env file correctly:\n" +
      "- VITE_AZURE_API_KEY: " + (AZURE_API_KEY ? "✓" : "✗") + "\n" +
      "- VITE_AZURE_ENDPOINT: " + (AZURE_ENDPOINT ? "✓" : "✗") + "\n" +
      "- VITE_AZURE_DEPLOYMENT: " + (AZURE_DEPLOYMENT ? "✓" : "✗") + " (should be grok-3)" + "\n" +
      "- VITE_AZURE_DALLE_DEPLOYMENT: " + (AZURE_DALLE_DEPLOYMENT ? "✓" : "✗") + " (should be dall-e-3)" + "\n" +
      "- VITE_AZURE_DALLE_ENDPOINT: " + (AZURE_DALLE_ENDPOINT ? "✓" : "✗") + "\n" +
      "\nPlease check your Azure API configuration in the .env file."
    );
  }
}

export const AIAssistant = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '## Welcome to FlierHustle! 👋\n\nI\'m your **AI assistant** here to help you create amazing posters and flyers. Here are some ways I can assist you:\n\n- Design and layout suggestions\n- Text content ideas for your posters\n- Image generation guidance\n- Template recommendations\n\nHow can I help with your poster creation today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Check if the user is requesting an image generation
    const isImageRequest = inputMessage.toLowerCase().includes('create image') || 
                          inputMessage.toLowerCase().includes('generate image') || 
                          inputMessage.toLowerCase().includes('make an image') ||
                          inputMessage.toLowerCase().includes('design a poster');

    try {
      // Only use client-side Azure AI if API key is available
      if (AZURE_API_KEY && AZURE_ENDPOINT) {
        try {
          // Create Azure AI client with API key authentication using AzureKeyCredential
          const client = new ModelClient(
            AZURE_ENDPOINT, 
            new AzureKeyCredential(AZURE_API_KEY)
          );
          
          // Prepare the messages for the Azure AI API
          const systemMessage = {
            role: "system",
            content: "You are a helpful AI assistant for FlierHustle, a poster and flier creation platform for small businesses and entrepreneurs in Africa. Keep responses under 200 words and always be encouraging about their business success. Format your responses using Markdown with proper headings, bold text, italics, bullet points, and numbered lists when appropriate to make the information clear and structured."
          };
          
          // Convert our messages to the format expected by Azure AI
          const apiMessages = [
            systemMessage,
            ...messages.filter(msg => messages.indexOf(msg) > 0).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: inputMessage
            }
          ];
          
          let responseContent = '';
          
          if (isImageRequest) {
            // For image requests, we need to use a different approach
            // Azure Grok-3 doesn't directly support image generation,
            // so we'll use it to generate a description for a potential image
            
            // Add a special instruction for image generation requests
            apiMessages.push({
              role: "system",
              content: "The user is requesting an image generation. Since I can't generate images directly, I'll provide a detailed description that could be used with image generation tools. Format your response using Markdown with clear headings, bullet points, and instructions."
            });
            
            // Call the chat completions API
            const response = await client.path("/chat/completions").post({
              body: {
                messages: apiMessages,
                max_tokens: 1000,
                temperature: 0.7,
                model: AZURE_DEPLOYMENT,
              }
            });
            
            if (response.status === "200") {
              responseContent = `## Image Generation Help

I understand you'd like an image of **${inputMessage.replace(/create image of |generate image of |make an image of /i, '')}**.

While I can't generate images directly, here's what I'd recommend for your poster:

1. Try using our **poster editor** feature on the dashboard
2. In the image prompt field, use this description:
   > "${inputMessage}"
3. Click the "**Generate AI Image**" button

Would you like me to help you with anything else about poster creation?`;
            } else {
              throw new Error("Failed to get response from Azure AI");
            }
          } else {
            // Regular text-based conversation
            // Call the chat completions API
            const response = await client.path("/chat/completions").post({
              body: {
                messages: apiMessages,
                max_tokens: 1000,
                temperature: 0.7,
                model: AZURE_DEPLOYMENT,
              }
            });
            
            if (response.status === "200") {
              // Extract content from response
              responseContent = response.body.choices[0].message.content;
            } else {
              throw new Error("Failed to get response from Azure AI");
            }
          }
          
          // Create the assistant message with the response
          const assistantMessage: Message = {
            role: 'assistant',
            content: responseContent || "I'm sorry, I couldn't generate a response at this time.",
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, assistantMessage]);
        } catch (azureError) {
          console.error('Azure AI error:', azureError);
          throw new Error('Could not generate response with Azure AI');
        }
      } else {
        throw new Error('Azure AI service not available. Please check your API keys in the environment configuration.');
      }
    } catch (error) {
      console.error('AI Assistant Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting to the AI service. Please check that your Azure API keys are correctly configured.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* AI Assistant Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 sm:bottom-40 md:bottom-48 right-4 sm:right-6 z-50 w-[calc(100%-32px)] sm:w-[450px] md:w-[500px] h-[65vh] sm:h-[500px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 animate-scale-in">
          <Card className="h-full flex flex-col border-0 shadow-none">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <div className="bg-white rounded-full p-1">
                    <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
                  </div>
                  AI Assistant
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div 
                className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto"
                style={{ maxHeight: "calc(100% - 68px)" }} // Increased to accommodate larger input area
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-1.5 sm:gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                        : 'bg-gray-200'
                    }`}>
                      {message.role === 'user' ? (
                        <div className="text-[10px] sm:text-xs text-white font-bold">You</div>
                      ) : (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      )}
                    </div>
                    
                    {/* Message bubble - improved responsive sizing with markdown support */}
                    <div
                      className={`max-w-[76%] sm:max-w-[75%] p-2.5 sm:p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="text-xs sm:text-sm break-words">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-base font-bold my-2" {...props}/>,
                              h2: ({node, ...props}) => <h2 className="text-sm font-bold my-1.5" {...props}/>,
                              h3: ({node, ...props}) => <h3 className="text-xs font-bold my-1" {...props}/>,
                              p: ({node, ...props}) => <p className="my-1" {...props}/>,
                              ul: ({node, ...props}) => <ul className="list-disc pl-4 my-1" {...props}/>,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-1" {...props}/>,
                              li: ({node, ...props}) => <li className="my-0.5" {...props}/>,
                              a: ({node, ...props}) => <a className="text-blue-600 underline" {...props}/>,
                              strong: ({node, ...props}) => <strong className="font-bold" {...props}/>,
                              em: ({node, ...props}) => <em className="italic" {...props}/>,
                              code: ({node, ...props}) => <code className="bg-gray-200 px-1 py-0.5 rounded" {...props}/>,
                              blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-gray-300 pl-2 italic" {...props}/>
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm break-words">{message.content}</p>
                      )}
                      <p className="text-[8px] sm:text-[10px] opacity-70 mt-1 text-right">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-1.5 sm:gap-2">
                    <div className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    </div>
                    <div className="bg-gray-100 p-2 sm:p-3 rounded-2xl flex items-center gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input - improved for mobile usability */}
              <div className="p-3 sm:p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about poster creation..."
                    className="flex-1 text-sm h-10 sm:h-11 px-3 sm:px-4"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Assistant Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 sm:bottom-24 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping opacity-20"></div>
        
        {/* Tooltip - responsive version that works on mobile and desktop */}
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          AI Assistant
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </>
  );
};
