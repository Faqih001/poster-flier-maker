import { GoogleGenAI } from "@google/genai";

// Use the environment variable for API key without hardcoded fallback
const API_KEY = process.env.GEMINI_API_KEY;

// Make sure API key exists
if (!API_KEY) {
  console.error('GEMINI_API_KEY is not defined in environment variables');
}

// Initialize the Gemini API
export const genAI = new GoogleGenAI({ apiKey: API_KEY as string });

// Generate text using Gemini
export async function generateText(prompt: string): Promise<string> {
  try {
    // Generate content using the gemini-pro model
    const response = await genAI.models.generateContent({
      model: "gemini-pro",
      contents: prompt
    });
    
    return response.text || '';
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text with Gemini API');
  }
}

// Generate image using Gemini
export async function generateImage(prompt: string): Promise<string> {
  try {
    // Use image generation model
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt
    });

    // Extract the image data
    const parts = response.candidates?.[0]?.content?.parts || [];
    // Find the part containing image data
    const imagePart = parts.find((part: { inlineData?: { mimeType?: string, data?: string } }) => 
      part.inlineData && part.inlineData.mimeType?.includes('image'));
    
    if (imagePart?.inlineData?.data) {
      return imagePart.inlineData.data;
    }
    
    throw new Error('No image data in response');
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image with Gemini API');
  }
}
