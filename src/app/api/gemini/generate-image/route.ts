import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Generate the image using Gemini API
    const imageData = await generateImage(prompt);
    
    // Return the base64 image data
    return NextResponse.json({ imageData });
  } catch (error) {
    console.error('Error in image generation API:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
