import { GenerativeAI } from "@google/genai";

// Use the environment variable for API key without hardcoded fallback
const API_KEY = process.env.GEMINI_API_KEY;

// Make sure API key exists
if (!API_KEY) {
  console.error('GEMINI_API_KEY is not defined in environment variables');
}

// Initialize the Gemini API
export const genAI = new GenerativeAI(API_KEY as string);

// Generate text using Gemini
export async function generateText(prompt: string): Promise<string> {
  try {
    // For text generation, we'll use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text with Gemini API');
  }
}

// Generate image using Gemini
export async function generateImage(prompt: string): Promise<string> {
  try {
    // Use image generation model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-preview-image-generation" });
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Extract the image data
    const parts = response.candidates?.[0]?.content?.parts || [];
    // Define the type for the part to avoid 'any' error
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
