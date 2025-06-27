import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AIRequest {
  message: string;
  context?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context }: AIRequest = await req.json();
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");

    if (!geminiApiKey) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return new Response(
        JSON.stringify({ 
          error: "AI service configuration error",
          response: "I'm sorry, our AI assistant is currently unavailable. Please try again later or contact our support team at fakiiahmad001@gmail.com for assistance."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!message) {
      return new Response(
        JSON.stringify({ 
          error: "Missing message",
          response: "Please provide a message to get a response from the AI assistant." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const prompt = `You are a helpful AI assistant for FlierHustle, a poster and flier creation platform for small businesses and entrepreneurs in Africa. 

Context: ${context || 'General FlierHustle assistance'}

User question: ${message}

Please provide a helpful, friendly, and concise response about poster creation, design tips, business marketing, or FlierHustle features. Keep responses under 200 words and always be encouraging about their business success.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response right now.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "I'm having trouble right now. Please try again later or contact our support team at fakiiahmad001@gmail.com"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
