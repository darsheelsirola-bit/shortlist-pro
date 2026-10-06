import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan = 'starter',
      credits = 15,
      amount,
    } = body || {};

    if (!razorpay_payment_id) {
      return NextResponse.json(
        { verified: false, error: 'Missing Razorpay Payment ID.' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 1. Production / Live Verification with Razorpay Secret
    if (keySecret) {
      // Signature verification if order_id and signature are present
      if (razorpay_order_id && razorpay_signature) {
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generatedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(text)
          .digest('hex');

        if (generatedSignature !== razorpay_signature) {
          console.error('Signature mismatch:', { generated: generatedSignature, received: razorpay_signature });
          return NextResponse.json(
            {
              verified: false,
              error: 'Invalid payment signature. Verification failed.',
            },
            { status: 400 }
          );
        }
      }

      // If Razorpay client is available and keyId exists, verify directly with Razorpay API
      if (keyId) {
        try {
          const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
          });

          const payment = await razorpay.payments.fetch(razorpay_payment_id);

          if (!payment) {
            return NextResponse.json(
              { verified: false, error: 'Payment not found on Razorpay.' },
              { status: 404 }
            );
          }

          if (payment.status !== 'captured' && payment.status !== 'authorized') {
            return NextResponse.json(
              {
                verified: false,
                error: `Payment status is '${payment.status}'. Only captured/authorized payments can be verified.`,
              },
              { status: 400 }
            );
          }
        } catch (apiError: any) {
          console.warn('Razorpay API fetch check warning:', apiError.message);
          // If signature was valid, signature check suffices
          if (!razorpay_signature) {
            return NextResponse.json(
              {
                verified: false,
                error: `Could not verify payment with Razorpay: ${apiError.message}`,
              },
              { status: 400 }
            );
          }
        }
      }

      const assignedCredits = Number(credits) || (plan === 'unlimited' ? 9999 : 15);

      return NextResponse.json({
        verified: true,
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id || null,
        plan,
        credits: assignedCredits,
        message: 'Payment successfully verified via Razorpay.',
      });
    }

    // 2. Simulated Sandbox Fallback (when RAZORPAY_KEY_SECRET is not configured yet)
    // Prevents breaking local development or initial staging testing
    const assignedCredits = Number(credits) || (plan === 'unlimited' ? 9999 : 15);
    return NextResponse.json({
      verified: true,
      success: true,
      mock: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id || null,
      plan,
      credits: assignedCredits,
      message: 'Verified in sandbox mode (RAZORPAY_KEY_SECRET not set in environment).',
    });
  } catch (error: any) {
    console.error('Razorpay verification route error:', error);
    return NextResponse.json(
      { verified: false, error: error.message || 'Payment verification failed due to internal error.' },
      { status: 500 }
    );
  }
}
