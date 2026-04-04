import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("pending_sessions")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Session not found or expired" }, { status: 404 });
    }

    // Usuń sesję po pobraniu
    await supabase
      .from("pending_sessions")
      .delete()
      .eq("stripe_session_id", sessionId);

    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      email: data.email,
      tier: data.tier,
      pay_per_use_expires_at: data.pay_per_use_expires_at,
    });
  } catch (error) {
    console.error("pending-session error:", error);
    return NextResponse.json({ error: "Failed to get session" }, { status: 500 });
  }
}