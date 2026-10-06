import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = 'starter', amount, credits } = body || {};

    const isUnlimited = plan === 'unlimited';
    const amountRupees = amount ? Number(amount) : (isUnlimited ? 99 : 49);
    const amountPaise = Math.round(amountRupees * 100);
    const calculatedCredits = credits ? Number(credits) : (isUnlimited ? 9999 : 15);
    const planName = isUnlimited ? 'Shortlist Unlimited — Monthly' : 'Shortlist Pass — 15 ATS Audits';

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const merchantUpi = process.env.NEXT_PUBLIC_MERCHANT_UPI_ID || 'darsheel.sirola@fam';

    // Standard UPI deep link
    const upiDeepLink = `upi://pay?pa=${encodeURIComponent(merchantUpi)}&pn=Shortlist&am=${amountRupees}&cu=INR&tn=${encodeURIComponent(planName)}`;
    const standardQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=4&data=${encodeURIComponent(upiDeepLink)}`;

    // 1. If Razorpay keys are configured:
    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      let qrId = null;
      let qrImageUrl = standardQrUrl;
      let orderId = null;

      // Create Razorpay Order first (always supported)
      try {
        const order = await razorpay.orders.create({
          amount: amountPaise,
          currency: 'INR',
          receipt: `rcpt_qr_${Date.now().toString().slice(-8)}`,
          notes: {
            plan: isUnlimited ? 'unlimited' : 'starter',
            credits: String(calculatedCredits),
            planName,
            channel: 'razorpay_upi_qr',
          },
        });
        orderId = order.id;
      } catch (orderErr: any) {
        console.warn('Razorpay order creation notice:', orderErr.message);
      }

      // Try creating Razorpay Dynamic UPI QR code
      try {
        const qrResponse: any = await razorpay.qrCode.create({
          type: 'upi_qr',
          name: 'Shortlist',
          usage: 'single_use',
          fixed_amount: true,
          payment_amount: amountPaise,
          description: planName,
          notes: {
            plan: isUnlimited ? 'unlimited' : 'starter',
            credits: String(calculatedCredits),
            orderId: orderId || '',
          },
        });

        if (qrResponse?.id) {
          qrId = qrResponse.id;
          if (qrResponse.image_url) {
            qrImageUrl = qrResponse.image_url;
          }
        }
      } catch (qrErr: any) {
        console.warn('Razorpay native QR code API notice (using fallback order QR):', qrErr.message);
      }

      return NextResponse.json({
        success: true,
        qrId: qrId || `qr_ord_${orderId || Date.now()}`,
        orderId: orderId,
        qrImageUrl: qrImageUrl,
        upiDeepLink: upiDeepLink,
        amountPaise,
        amountRupees,
        currency: 'INR',
        keyId,
        plan: isUnlimited ? 'unlimited' : 'starter',
        planName,
        credits: calculatedCredits,
        merchantUpi,
        mock: false,
      });
    }

    // 2. Fallback / Test Sandbox Mode
    const mockOrderId = `order_sim_${Date.now()}`;
    const mockQrId = `qr_sim_${Date.now()}`;

    return NextResponse.json({
      success: true,
      qrId: mockQrId,
      orderId: mockOrderId,
      qrImageUrl: standardQrUrl,
      upiDeepLink: upiDeepLink,
      amountPaise,
      amountRupees,
      currency: 'INR',
      keyId: keyId || 'rzp_test_placeholder',
      plan: isUnlimited ? 'unlimited' : 'starter',
      planName,
      credits: calculatedCredits,
      merchantUpi,
      mock: true,
      message: 'Razorpay keys pending. Live test QR code generated.',
    });
  } catch (error: any) {
    console.error('Razorpay QR route error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate Razorpay QR code.' },
      { status: 500 }
    );
  }
}
