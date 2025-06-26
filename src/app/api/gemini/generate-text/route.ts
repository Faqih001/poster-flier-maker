import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    // Check for API key first
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured in environment variables' }, 
        { status: 500 }
      );
    }
    
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Generate text using Gemini API
    const generatedText = await generateText(prompt);
    
    // Return the generated text
    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('Error in text generation API:', error);
    return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}
