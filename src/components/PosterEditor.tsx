import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Wand2, Type, Image, Palette, Sparkles, Save } from 'lucide-react';
import { Template } from '@/types/template';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useDesigns } from '@/hooks/useDesigns';
import ModelClient from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import axios from 'axios';

interface PosterEditorProps {
  template: Template;
  onBack: () => void;
}

export const PosterEditor: React.FC<PosterEditorProps> = ({ template, onBack }) => {
  const { user } = useAuth();
  const { saveDesign } = useDesigns();
  
  // Azure AI configuration
  const AZURE_API_KEY = import.meta.env.VITE_AZURE_API_KEY;
  const AZURE_ENDPOINT = import.meta.env.VITE_AZURE_ENDPOINT;
  const AZURE_DEPLOYMENT = import.meta.env.VITE_AZURE_DEPLOYMENT || "grok-3"; // Text generation model
  
  // Azure DALL-E configuration for image generation
  const AZURE_DALLE_DEPLOYMENT = import.meta.env.VITE_AZURE_DALLE_DEPLOYMENT || "dall-e-3";
  const AZURE_DALLE_ENDPOINT = import.meta.env.VITE_AZURE_DALLE_ENDPOINT || 
    (AZURE_ENDPOINT ? `${AZURE_ENDPOINT}/openai/deployments/${AZURE_DALLE_DEPLOYMENT}/images/generations?api-version=2024-02-01` : '');
  const AZURE_DALLE_API_KEY = import.meta.env.VITE_AZURE_DALLE_API_KEY || AZURE_API_KEY;
  
  const [posterText, setPosterText] = useState({
    headline: 'Your Amazing Offer',
    subheading: 'Limited Time Special',
    description: 'Don\'t miss out on this incredible opportunity. Visit us today!',
    cta: 'Call Now: +254 XXX XXX XXX'
  });

  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [designTitle, setDesignTitle] = useState('My Poster Design');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to use the poster editor');
      onBack();
    }
  }, [user, onBack]);

  const generateAIText = async () => {
    setIsGeneratingText(true);
    try {
      // Check if Azure API key and endpoint are available
      if (!AZURE_API_KEY || !AZURE_ENDPOINT) {
        throw new Error("Azure API key or endpoint is missing. Please check your environment variables.");
      }
      
      // Create Azure AI client
      const client = new ModelClient(
        AZURE_ENDPOINT,
        new AzureKeyCredential(AZURE_API_KEY)
      );
      
      // Create a prompt based on the template type to generate appropriate text
      const systemPrompt = "You are a creative marketing assistant that specializes in creating compelling poster text content. Always respond in JSON format only.";
      
      const userPrompt = `
        Generate creative and compelling text content for a ${template.name} poster.
        The text should include:
        1. An attention-grabbing headline (short and impactful, can include emojis if appropriate)
        2. A brief subheading (1-2 lines)
        3. A short description paragraph (2-3 lines max)
        4. A call to action with placeholder phone number (+254 XXX XXX XXX)
        
        The tone should be professional but engaging, appropriate for business marketing.
        Return ONLY in JSON format like this:
        {
          "headline": "Your headline here",
          "subheading": "Your subheading here",
          "description": "Your description here",
          "cta": "Your call to action here"
        }
      `;
      
      // Prepare messages for chat completion
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];
      
      // Send request to Azure OpenAI
      const response = await client.path("/chat/completions").post({
        body: {
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
          model: AZURE_DEPLOYMENT || "grok-3"
          // Note: response_format is not yet supported in all Azure OpenAI versions
        }
      });
      
      // Extract text from response
      const responseText = response.body.choices[0].message.content;
      
      try {
        // Parse JSON response
        const posterContent = JSON.parse(responseText);
        setPosterText(posterContent);
        toast.success("AI text generated successfully!");
      } catch (jsonError) {
        // Fallback to predefined suggestions if JSON parsing fails
        // Fallback to predefined suggestions if JSON parsing fails
        const suggestions = [
          {
            headline: '🔥 MEGA SALE ALERT! 🔥',
            subheading: 'Up to 70% OFF Everything',
            description: 'Limited time offer! Shop now and save big on all your favorite items. Don\'t let this amazing deal slip away!',
            cta: 'Shop Now - Call: +254 XXX XXX XXX'
          },
          {
            headline: 'Grand Opening Special',
            subheading: 'New Store, New Deals',
            description: 'Celebrate with us! Exclusive opening discounts, free gifts, and amazing prizes await you.',
            cta: 'Visit Today - WhatsApp: +254 XXX XXX XXX'
          }
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        setPosterText(randomSuggestion);
        toast.warning("Using example text. Try again for AI-generated content.");
      }
    } catch (error) {
      console.error('Error generating text:', error);
      toast.error("Failed to generate text. Using example content instead.");
      
      // Fallback content
      setPosterText({
        headline: 'Your Amazing Offer',
        subheading: 'Limited Time Special',
        description: 'Don\'t miss out on this incredible opportunity. Visit us today!',
        cta: 'Call Now: +254 XXX XXX XXX'
      });
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generateAIImage = async () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }

    setIsGeneratingImage(true);
    try {
      // Check for Azure DALL-E API configuration
      if (!AZURE_DALLE_API_KEY || !AZURE_DALLE_ENDPOINT) {
        throw new Error("Azure DALL-E API key or endpoint is missing. Please check your environment variables.");
      }
      
      // Construct a prompt that will work well with the poster design
      const enhancedPrompt = 
        `Create a professional poster image for: ${imagePrompt}. ` +
        `Make it suitable for a ${template.name} poster, with clean design, ` +
        `high visual appeal, and appropriate for business use. ` +
        `The image should be visually striking and have a professional look.`;
      
      // First try using the Supabase function as it might be optimized for our use case
      try {
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: { 
            prompt: enhancedPrompt,
            templateStyle: template.name
          }
        });
        
        if (!error && data && data.imageUrl) {
          setGeneratedImage(data.imageUrl);
          toast.success("Image generated successfully via Supabase function!");
          return;
        }
      } catch (supabaseError) {
        console.warn('Supabase image generation failed, falling back to Azure DALL-E:', supabaseError);
      }
      
      // If Supabase function fails, use Azure DALL-E directly
      toast.info("Generating image with Azure DALL-E...");
      
      try {
        // Make API request to Azure DALL-E
        const response = await axios.post(
          AZURE_DALLE_ENDPOINT,
          {
            prompt: enhancedPrompt,
            n: 1,
            size: '1024x1024',
            response_format: 'url'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'api-key': AZURE_DALLE_API_KEY
            }
          }
        );
        
        // Extract the image URL from the response
        if (response.data && response.data.data && response.data.data.length > 0) {
          const imageUrl = response.data.data[0].url;
          setGeneratedImage(imageUrl);
          toast.success("Image generated successfully via Azure DALL-E!");
        } else {
          throw new Error("No image was generated. Please try a different prompt.");
        }
      } catch (dalleError) {
        console.error('Azure DALL-E error:', dalleError);
        throw new Error("Failed to generate image with Azure DALL-E. Please try a different prompt.");
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image. Using a placeholder instead.");
      
      // Fallback to a placeholder image based on the template type
      const placeholderImages = {
        'Business': '/placeholders/business.jpg',
        'Event': '/placeholders/event.jpg',
        'Sale': '/placeholders/sale.jpg',
        'Promotion': '/placeholders/promotion.jpg',
        'default': '/placeholder.svg'
      };
      
      // Get a placeholder image that matches the template name or use default
      const placeholderImage = placeholderImages[template.name] || placeholderImages.default;
      
      // Set the placeholder and inform the user
      setGeneratedImage(placeholderImage);
      toast.warning("Using a template image. You can try again with a different prompt.");
      
      // Suggest an improved prompt to the user based on their initial request
      // This gives them actionable feedback for their next attempt
      const improvedPrompt = 
        `Try using a more descriptive prompt such as: "Professional ${template.name.toLowerCase()} poster ` + 
        `with ${imagePrompt}, high quality, photorealistic, clean layout"`;
        
      toast.info(improvedPrompt, { duration: 8000 });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSaveDesign = async () => {
    if (!user) {
      toast.error('Please sign in to save designs');
      return;
    }

    setIsSaving(true);
    try {
      const designData = {
        template: template,
        posterText: posterText,
        generatedImage: generatedImage,
        imagePrompt: imagePrompt
      };

      await saveDesign(designTitle, designData);
    } catch (error) {
      console.error('Error saving design:', error);
      toast.error('Failed to save design');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    toast.success("Poster exported successfully!");
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
          
          <div className="flex space-x-4">
            <Button
              onClick={generateAIText}
              disabled={isGeneratingText}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isGeneratingText ? 'Generating...' : 'AI Generate Text'}
            </Button>

            <Button
              onClick={handleSaveDesign}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Design'}
            </Button>
            
            <Button
              onClick={handleExport}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Poster
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editing Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Design Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Design Title</label>
                  <Input
                    value={designTitle}
                    onChange={(e) => setDesignTitle(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter design title"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Text Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Headline</label>
                  <Input
                    value={posterText.headline}
                    onChange={(e) => setPosterText({...posterText, headline: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter your headline"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Subheading</label>
                  <Input
                    value={posterText.subheading}
                    onChange={(e) => setPosterText({...posterText, subheading: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter your subheading"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={posterText.description}
                    onChange={(e) => setPosterText({...posterText, description: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter your description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Call to Action</label>
                  <Input
                    value={posterText.cta}
                    onChange={(e) => setPosterText({...posterText, cta: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Enter your call to action"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Image className="w-5 h-5 mr-2" />
                  AI Image Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Image Prompt</label>
                  <Textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                    placeholder="Describe the image you want to generate..."
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={generateAIImage}
                  disabled={isGeneratingImage}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGeneratingImage ? 'Generating Image...' : 'Generate AI Image'}
                </Button>

                {generatedImage && (
                  <div className="mt-4">
                    <img 
                      src={generatedImage} 
                      alt="Generated" 
                      className="w-full rounded-lg border border-white/20"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: template.backgroundColor }}
                  ></div>
                  <span className="text-white text-sm">Background</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: template.accentColor }}
                  ></div>
                  <span className="text-white text-sm">Accent</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
              <CardContent className="p-6">
                <div className="aspect-[3/4] mx-auto max-w-md rounded-lg overflow-hidden shadow-2xl"
                     style={{ backgroundColor: template.backgroundColor }}>
                  <div className="h-full p-6 flex flex-col justify-between text-center relative"
                       style={{ color: template.textColor }}>
                    
                    {/* Background Image */}
                    {generatedImage && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${generatedImage})` }}
                      ></div>
                    )}
                    
                    <div className="space-y-4 relative z-10">
                      <h1 className="text-3xl font-bold leading-tight">
                        {posterText.headline}
                      </h1>
                      
                      <div className="w-16 h-1 mx-auto rounded-full"
                           style={{ backgroundColor: template.accentColor }}>
                      </div>
                      
                      <h2 className="text-xl font-semibold">
                        {posterText.subheading}
                      </h2>
                    </div>

                    <div className="space-y-4 relative z-10">
                      <p className="text-lg leading-relaxed">
                        {posterText.description}
                      </p>
                      
                      <div className="px-4 py-3 rounded-lg font-bold text-lg"
                           style={{ 
                             backgroundColor: template.accentColor,
                             color: template.backgroundColor 
                           }}>
                        {posterText.cta}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
