import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // Azure OpenAI configuration
    const AZURE_DALLE_API_KEY = Deno.env.get('AZURE_DALLE_API_KEY')
    const AZURE_DALLE_ENDPOINT = Deno.env.get('AZURE_DALLE_ENDPOINT')
    if (!AZURE_DALLE_API_KEY || !AZURE_DALLE_ENDPOINT) {
      return new Response(
        JSON.stringify({ error: 'Azure DALL-E API key or endpoint not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

    // Call Azure DALL-E endpoint
    const response = await fetch(AZURE_DALLE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_DALLE_API_KEY
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'url'
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Azure DALL-E API error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to generate image', details: errorData }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status 
        }
      )
    }

    const data = await response.json()
    if (data.data && data.data.length > 0 && data.data[0].url) {
      return new Response(
        JSON.stringify({ imageUrl: data.data[0].url, success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      return new Response(
        JSON.stringify({ error: 'No image generated' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      )
    }

  } catch (error) {
    console.error('Error in generate-image function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
