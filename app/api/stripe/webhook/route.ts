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

    // Znajdź lub stwórz usera
    const { data: { users } } = await supabase.auth.admin.listUsers();
    let authUser = users.find(u => u.email === email) ?? null;

    if (!authUser) {
      const { data: newUser } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });
      authUser = newUser.user ?? null;
    }

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

    // Generuj magic link i wyślij przez Resend
    const { data: linkData } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        redirectTo: "https://dockitt.com/auth/callback",
      },
    });

    const magicLink = linkData?.properties?.action_link;

    if (magicLink) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Dockitt <hello@dockitt.com>",
          to: email,
          subject: "Your Dockitt access is ready",
          html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 700; color: #111; margin: 0 0 8px;">Thanks for your purchase! 🎉</h1>
              <p style="font-size: 16px; color: #555; margin: 0 0 24px;">Click the button below to sign in and access your files.</p>
              <a href="${magicLink}" style="display: inline-block; padding: 14px 28px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Access your files →</a>
              <p style="font-size: 13px; color: #9ca3af; margin: 24px 0 0;">This link expires in 24 hours. If you didn't make this purchase, please ignore this email.</p>
            </div>
          `,
        }),
      });
    }
  }

  return NextResponse.json({ received: true });
}