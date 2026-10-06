import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = 'starter', amount, credits } = body || {};

    const isUnlimited = plan === 'unlimited';
    // Amounts in paise: ₹49 -> 4900, ₹99 -> 9900
    const calculatedAmount = amount ? Math.round(Number(amount) * 100) : (isUnlimited ? 9900 : 4900);
    const calculatedCredits = credits ? Number(credits) : (isUnlimited ? 9999 : 15);
    const planName = isUnlimited ? 'Shortlist Unlimited — Monthly' : 'Shortlist Pass — 15 ATS Audits';

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay keys are configured in environment variables:
    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const orderOptions = {
        amount: calculatedAmount,
        currency: 'INR',
        receipt: `rcpt_sl_${Date.now().toString().slice(-8)}`,
        notes: {
          plan: isUnlimited ? 'unlimited' : 'starter',
          credits: String(calculatedCredits),
          planName,
          appName: 'Shortlist',
        },
      };

      const order = await razorpay.orders.create(orderOptions);

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keyId,
        plan: isUnlimited ? 'unlimited' : 'starter',
        credits: calculatedCredits,
        mock: false,
      });
    }

    // Graceful fallback for test/sandbox mode if API keys have not yet been placed in .env.local
    const mockOrderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: calculatedAmount,
      currency: 'INR',
      keyId: keyId || 'rzp_test_placeholder',
      plan: isUnlimited ? 'unlimited' : 'starter',
      credits: calculatedCredits,
      mock: true,
      message: 'Razorpay keys pending in environment. Simulated test order initialized.',
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
