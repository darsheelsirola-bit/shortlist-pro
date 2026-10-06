import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const qrId = searchParams.get('qrId');
    const orderId = searchParams.get('orderId');
    const plan = searchParams.get('plan') || 'starter';
    const creditsParam = searchParams.get('credits');
    const calculatedCredits = creditsParam ? Number(creditsParam) : (plan === 'unlimited' ? 9999 : 15);

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // 1. Live status check with Razorpay API
    if (keyId && keySecret) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      // Check payments received on the QR code entity
      if (qrId && !qrId.startsWith('qr_sim_') && !qrId.startsWith('qr_ord_')) {
        try {
          const qrPayments: any = await razorpay.qrCode.fetchAllPayments(qrId);
          if (qrPayments && Array.isArray(qrPayments.items) && qrPayments.items.length > 0) {
            const captured = qrPayments.items.find((p: any) => p.status === 'captured' || p.status === 'authorized');
            if (captured) {
              return NextResponse.json({
                paid: true,
                verified: true,
                paymentId: captured.id,
                amount: captured.amount,
                method: captured.method || 'upi',
                plan,
                credits: calculatedCredits,
                message: 'QR code payment captured and verified via Razorpay.',
              });
            }
          }
        } catch (qrCheckErr: any) {
          console.warn('QR status check notice:', qrCheckErr.message);
        }
      }

      // Check payments received on the linked order
      if (orderId && !orderId.startsWith('order_sim_')) {
        try {
          const orderPayments: any = await razorpay.orders.fetchPayments(orderId);
          if (orderPayments && Array.isArray(orderPayments.items) && orderPayments.items.length > 0) {
            const captured = orderPayments.items.find((p: any) => p.status === 'captured' || p.status === 'authorized');
            if (captured) {
              return NextResponse.json({
                paid: true,
                verified: true,
                paymentId: captured.id,
                amount: captured.amount,
                method: captured.method || 'upi',
                plan,
                credits: calculatedCredits,
                message: 'Order payment captured and verified via Razorpay.',
              });
            }
          }
        } catch (orderCheckErr: any) {
          console.warn('Order payments check notice:', orderCheckErr.message);
        }
      }

      return NextResponse.json({
        paid: false,
        status: 'pending',
        message: 'Awaiting payment confirmation from Razorpay.',
      });
    }

    // 2. Sandbox simulation mode
    return NextResponse.json({
      paid: false,
      status: 'pending',
      mock: true,
      message: 'Running in sandbox mode. Waiting for payment.',
    });
  } catch (error: any) {
    console.error('Razorpay QR status check error:', error);
    return NextResponse.json(
      { paid: false, error: error.message || 'Status check failed.' },
      { status: 500 }
    );
  }
}
