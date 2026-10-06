import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan, returnUrl } = body || {};
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // Validate plan
    const safePlan = plan === 'unlimited' ? 'unlimited' : 'starter';
    const isUnlimited = safePlan === 'unlimited';

    // Prevent open redirect attacks: only allow valid relative paths
    let safeReturnUrl = '/app';
    if (typeof returnUrl === 'string' && returnUrl.startsWith('/') && !returnUrl.startsWith('//')) {
      safeReturnUrl = returnUrl;
    }

    // Ultra-Affordable Pricing: ₹49 (4900 paise) and ₹99 (9900 paise)
    const unitAmount = isUnlimited ? 9900 : 4900;
    const priceDisplay = isUnlimited ? '₹99' : '₹49';

    // Zero-config simulated checkout for instant testing when no Stripe keys exist yet
    if (!stripeKey) {
      return NextResponse.json({
        demo: true,
        message: 'Stripe keys not set in .env.local yet. Simulated INR checkout activated.',
        plan: safePlan,
        priceDisplay,
        url: `${safeReturnUrl}?payment=success&plan=${safePlan}`
      });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16' as any,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: isUnlimited ? 'Shortlist Pro — Unlimited Monthly' : 'Shortlist Pass — 15 ATS Audits',
              description: isUnlimited 
                ? 'Unlimited AI ATS resume audits, keyword gap tools, and cover letter tailoring.'
                : '15 credits for precision ATS resume audits and metric upgrades.',
            },
            unit_amount: unitAmount,
            ...(isUnlimited ? { recurring: { interval: 'month' } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: isUnlimited ? 'subscription' : 'payment',
      success_url: `${returnUrl || 'http://localhost:3000'}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl || 'http://localhost:3000'}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
