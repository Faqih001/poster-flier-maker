import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDEFsF9visXbuZfNEvtPvC8wI_deQBH-ro';

// Initialize the Gemini API
export const genAI = new GoogleGenAI({ apiKey: API_KEY });

// Generate image using Gemini
export async function generateImage(prompt: string): Promise<string> {
  try {
    // Set responseModalities to include "IMAGE" so the model can generate an image
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Extract the image from the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image was generated");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

// Generate text using Gemini
export async function generateText(prompt: string): Promise<string> {
  try {
    const model = genAI.models.get("gemini-1.5-pro");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    throw error;
  }
}
