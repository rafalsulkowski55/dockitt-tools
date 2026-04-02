import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_details?.email;

    if (!email) {
      return NextResponse.json({ error: "No email found" }, { status: 404 });
    }

    return NextResponse.json({ email });
  } catch (error) {
    console.error("session route error:", error);
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}