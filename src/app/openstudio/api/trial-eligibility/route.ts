import { NextRequest, NextResponse } from "next/server";
import { createAuthClient, createServiceClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  const authClient = createAuthClient(token);

  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  let body: { device_fingerprint?: string } = {};
  try {
    body = await request.json();
  } catch {
    // no body is fine
  }

  const serviceClient = createServiceClient();

  const { data: subscription } = await serviceClient
    .from("subscriptions")
    .select("has_used_trial, device_fingerprint")
    .eq("user_id", user.id)
    .single();

  if (subscription?.has_used_trial) {
    return NextResponse.json({
      eligible: false,
      reason: "trial_already_used",
    });
  }

  if (body.device_fingerprint) {
    const { data: existingDevice } = await serviceClient
      .from("subscriptions")
      .select("user_id")
      .eq("device_fingerprint", body.device_fingerprint)
      .eq("has_used_trial", true)
      .limit(1)
      .single();

    if (existingDevice) {
      return NextResponse.json({
        eligible: false,
        reason: "device_trial_used",
      });
    }

    await serviceClient
      .from("subscriptions")
      .upsert(
        {
          user_id: user.id,
          device_fingerprint: body.device_fingerprint,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
  }

  return NextResponse.json({ eligible: true });
}
