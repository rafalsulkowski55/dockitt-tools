import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const mode = session.mode;

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: { users } } = await supabase.auth.admin.listUsers();
    const authUser = users.find(u => u.email === email) ?? null;
    const userId = authUser?.id ?? null;

    if (mode === "payment") {
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

      if (userId) {
        await supabase.from("profiles").upsert({
          id: userId,
          email,
          tier: "pay_per_use",
          pay_per_use_expires_at: expiresAt,
          stripe_customer_id: session.customer as string,
        });
      }
    } else if (mode === "subscription") {
      if (userId) {
        await supabase.from("profiles").upsert({
          id: userId,
          email,
          tier: "premium",
          stripe_customer_id: session.customer as string,
        });
      }
    }

    // Wyślij magic link
    await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        redirectTo: "https://dockitt.com/auth/callback",
      },
    });
  }

  return NextResponse.json({ received: true });
}