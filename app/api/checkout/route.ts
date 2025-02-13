import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const values = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/dashboard/hospitals/success?data=${encodeURIComponent(
        JSON.stringify(values)
      )}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/hospitals/cancel`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Hospital Registration Fee" },
            unit_amount: 5000, // $50.00 in cents
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
