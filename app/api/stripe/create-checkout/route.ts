import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { email, plan } = await req.json();

    if (!email || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Znajdź lub stwórz Stripe Customer
    const existing = await stripe.customers.list({ email, limit: 1 });
    let customerId: string;

    if (existing.data.length > 0) {
      customerId = existing.data[0].id;
    } else {
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
    }

    // Dobierz priceId i mode
    let priceId: string;
    let mode: "payment" | "subscription";

    if (plan === "pay_per_use") {
      priceId = PLANS.pay_per_use.priceId;
      mode = "payment";
    } else if (plan === "premium_monthly") {
      priceId = PLANS.premium.priceIdMonthly;
      mode = "subscription";
    } else if (plan === "premium_yearly") {
      priceId = PLANS.premium.priceIdYearly;
      mode = "subscription";
    } else {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://dockitt.com";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("create-checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}