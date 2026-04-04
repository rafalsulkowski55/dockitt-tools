import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

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
    const stripeSessionId = session.id;

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Znajdź lub stwórz usera
    const { data: { users } } = await supabase.auth.admin.listUsers();
    let authUser = users.find(u => u.email === email) ?? null;
    let isNewUser = false;
    let tempPassword: string = generatePassword();

    if (!authUser) {
      isNewUser = true;
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
      });
      if (createError) {
        console.error("Error creating user:", createError);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
      }
      authUser = newUser.user ?? null;
    } else {
      // Istniejący user — zmień hasło żeby zalogować
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        authUser.id,
        { password: tempPassword }
      );
      if (updateError) {
        console.error("Error updating user password:", updateError);
      }
    }

    const userId = authUser?.id ?? null;
    if (!userId) {
      return NextResponse.json({ error: "No user ID" }, { status: 500 });
    }

    // Upsert profilu
    let tier = "free";
    let expiresAt: string | null = null;

    if (mode === "payment") {
      tier = "pay_per_use";
      expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
      await supabase.from("profiles").upsert({
        id: userId,
        email,
        tier: "pay_per_use",
        pay_per_use_expires_at: expiresAt,
        stripe_customer_id: session.customer as string,
      });
    } else if (mode === "subscription") {
      tier = "premium";
      await supabase.from("profiles").upsert({
        id: userId,
        email,
        tier: "premium",
        stripe_customer_id: session.customer as string,
      });
    }

    // Zaloguj przez email+hasło i zapisz sesję
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: tempPassword,
    });

    if (signInError || !signInData?.session) {
      console.error("Error signing in:", signInError);
    } else {
      console.log("Inserting pending session for:", email, "stripe session:", stripeSessionId);
      await supabase.from("pending_sessions").insert({
        stripe_session_id: stripeSessionId,
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
        email,
        tier,
        pay_per_use_expires_at: expiresAt,
      });
    }

    // Wyślij email przez Resend
    const planLabel = tier === "pay_per_use" ? "48-hour access" : "Premium";
    const activeUntil = expiresAt
      ? `Active until: ${new Date(expiresAt).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}`
      : "Active: monthly renewal";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dockitt <hello@dockitt.com>",
        to: email,
        subject: "Thank you for your payment — Dockitt",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 24px; font-weight: 700; color: #111; margin: 0 0 8px;">Thank you for your payment! 🎉</h1>
            <p style="font-size: 16px; color: #555; margin: 0 0 24px;">Your plan is now active.</p>

            <a href="https://www.dockitt.com" style="display: inline-block; padding: 14px 28px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 32px;">Go to Dockitt →</a>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

            <h2 style="font-size: 16px; font-weight: 600; color: #111; margin: 0 0 12px;">Payment details</h2>
            <table style="width: 100%; font-size: 14px; color: #555;">
              <tr><td style="padding: 4px 0;">Email:</td><td style="padding: 4px 0;">${email}</td></tr>
              <tr><td style="padding: 4px 0;">Plan:</td><td style="padding: 4px 0;">${planLabel}</td></tr>
              <tr><td style="padding: 4px 0;">${activeUntil}</td></tr>
            </table>

            ${isNewUser ? `
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <h2 style="font-size: 16px; font-weight: 600; color: #111; margin: 0 0 12px;">Your account details</h2>
            <table style="width: 100%; font-size: 14px; color: #555;">
              <tr><td style="padding: 4px 0;">Email:</td><td style="padding: 4px 0;">${email}</td></tr>
              <tr><td style="padding: 4px 0;">Password:</td><td style="padding: 4px 0; font-family: monospace; font-weight: 600;">${tempPassword}</td></tr>
            </table>
            <p style="font-size: 13px; color: #9ca3af; margin: 12px 0 0;">You can change your password anytime in My Account.</p>
            ` : ""}

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">If you did not make this purchase, please ignore this email.</p>
          </div>
        `,
      }),
    });
  }

  return NextResponse.json({ received: true });
}