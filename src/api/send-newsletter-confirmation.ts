const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'no-reply@flierhustle.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const emailBody = {
      from: FROM_EMAIL,
      to: email,
      subject: 'Confirm your subscription to FlierHustle',
      html: [
        '<h2>Welcome to FlierHustle!</h2>',
        '<p>Thank you for subscribing to our newsletter. Please confirm your subscription by clicking the link below:</p>',
        `<p><a href='https://flierhustle.com/confirm?email=${encodeURIComponent(email)}'>Confirm Subscription</a></p>`,
        '<p>If you did not request this, you can ignore this email.</p>'
      ].join('')
    };
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody)
    });
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send confirmation email' });
  }
}
