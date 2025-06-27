
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Initialize the Google GenAI and Supabase URL from .env file
// Accessing environment variables with Vite's import.meta.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-pro";

// For development, log if environment variables are missing
if (import.meta.env.DEV && (!API_KEY || !SUPABASE_FUNCTION_URL)) {
  console.warn(
    "Missing environment variables. Make sure you've set up your .env file correctly:\n" +
    "- VITE_GEMINI_API_KEY: " + (API_KEY ? "✓" : "✗") + "\n" +
    "- VITE_SUPABASE_FUNCTION_URL: " + (SUPABASE_FUNCTION_URL ? "✓" : "✗")
  );
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your FlierHustle AI assistant. How can I help you create amazing posters today?',
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

    try {
      // First try using the Supabase function (primary approach)
      try {
        console.log(`Calling Supabase function at: ${SUPABASE_FUNCTION_URL}`);
        const response = await fetch(SUPABASE_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: inputMessage,
            context: 'FlierHustle poster creation assistant'
          }),
          // Set a reasonable timeout
          signal: AbortSignal.timeout(8000)
        });

        if (!response.ok) throw new Error('Failed to get AI response');

        const data = await response.json();
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
        return; // Exit if Supabase function worked
      } catch (supabaseError) {
        console.warn('Supabase AI function failed, falling back to client-side AI:', supabaseError);
        // Continue to fallback implementation
      }
      
      // Fallback to client-side Gemini if API key is available
      if (API_KEY) {
        // Initialize the Google AI with the newer API
        const genAI = new GoogleGenAI({
          apiKey: API_KEY,
        });
        
        // Use the latest gemini-2.5-pro model
        const model = genAI.models;
        
        // Add system prompt context + conversation history
        const systemPrompt = 'You are a helpful AI assistant for FlierHustle, a poster and flier creation platform for small businesses and entrepreneurs in Africa. Keep responses under 200 words and always be encouraging about their business success.';
        
        // Create conversation content with previous messages
        const conversationContext = messages
          .filter(msg => messages.indexOf(msg) > 0) // Skip the initial greeting
          .map(msg => msg.content)
          .join("\n\n");
          
        const fullPrompt = `${systemPrompt}\n\n${conversationContext}\n\n${inputMessage}`;
          
        // Send the request with the newer API
        const response = await model.generateContent({
          model: GEMINI_MODEL,
          contents: fullPrompt,
          generation_config: {
            temperature: 0.7,
            max_output_tokens: 1024,
          },
        });
        
        // Extract the text response
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.text || "I'm sorry, I couldn't generate a response at this time.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('AI service not available');
      }
    } catch (error) {
      console.error('AI Assistant Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble right now. Please try again later or contact our support team.',
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
                    
                    {/* Message bubble - improved responsive sizing */}
                    <div
                      className={`max-w-[76%] sm:max-w-[75%] p-2.5 sm:p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-xs sm:text-sm break-words">{message.content}</p>
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
