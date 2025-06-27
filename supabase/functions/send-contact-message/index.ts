
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactRequest = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("Resend API key not configured");
    }

    const resend = new Resend(resendApiKey);

    // Send email to support team
    const emailResponse = await resend.emails.send({
      from: "FlierHustle Contact <contact@flierHustle.com>",
      to: ["fakiiahmad001@gmail.com"],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Reply to:</strong> ${email}
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "FlierHustle Support <support@flierHustle.com>",
      to: [email],
      subject: "We received your message - FlierHustle Support",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">FlierHustle</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Thank you for contacting us!</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #374151; margin-bottom: 20px;">Hi ${name}!</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">
              We've received your message about "<strong>${subject}</strong>" and our team will get back to you within 24 hours.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Your message:</h3>
              <p style="color: #6b7280; font-style: italic;">"${message}"</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              In the meantime, feel free to explore our templates and start creating amazing posters for your business!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://flierHustle.com/templates" 
                 style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold;
                        display: inline-block;">
                Browse Templates
              </a>
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Need immediate help? WhatsApp us at +254741140250
            </p>
          </div>
        </div>
      `,
    });

    console.log("Contact form email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Message sent successfully!" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-message function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        message: "Failed to send message. Please try again later." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
