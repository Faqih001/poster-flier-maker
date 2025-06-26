import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
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
