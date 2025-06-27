import fetch from 'node-fetch';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, email, plan, phone } = req.body;
  if (!amount || !email || !plan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const apiKey = process.env.INTASEND_SECRET_KEY;
  const publishableKey = process.env.INTASEND_PUBLISHABLE_KEY;
  const testMode = process.env.INTASEND_TEST_MODE === 'true';

  // IntaSend API endpoints
  const baseUrl = testMode
    ? 'https://sandbox.intasend.com/api/v1/'
    : 'https://payment.intasend.com/api/v1/';

  // Use the Create Checkout endpoint for card, mpesa, paypal
  const checkoutUrl = baseUrl + 'checkout/';

  try {
    // Create checkout session
    const response = await fetch(checkoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        public_key: publishableKey,
        amount,
        currency: 'KES',
        email,
        host: req.headers.origin || 'https://flierhustle.com',
        redirect_url: `${req.headers.origin || 'https://flierhustle.com'}/pricing?success=true`,
        methods: ['CARD', 'MPESA', 'PAYPAL'],
        description: `Purchase of ${plan} plan on FlierHustle`,
        // Optionally include phone for MPESA
        ...(phone ? { phone_number: phone } : {}),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to initiate payment');

    // If user selected MPESA and provided phone, send STK push
    if (plan === 'MPESA' && phone) {
      // See https://developers.intasend.com/reference/send-mpesa-stk-push
      const stkUrl = baseUrl + 'mpesa/stk-push/';
      const stkRes = await fetch(stkUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          public_key: publishableKey,
          amount,
          currency: 'KES',
          phone_number: phone,
          email,
          narrative: `Purchase of ${plan} plan on FlierHustle`,
          redirect_url: `${req.headers.origin || 'https://flierhustle.com'}/pricing?success=true`,
        }),
      });
      const stkData = await stkRes.json();
      if (!stkRes.ok) throw new Error(stkData.error || 'Failed to send MPESA STK push');
      return res.status(200).json(stkData);
    }

    // Return checkout session for card/mpesa/paypal
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Payment error' });
  }
}
