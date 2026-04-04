import { NextRequest, NextResponse } from "next/server";
import { createAuthClient, createServiceClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
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

  const serviceClient = createServiceClient();

  const deviceFingerprint = request.headers.get("X-Device-Fingerprint");
  const deviceName = request.headers.get("X-Device-Name");

  const { data: subscription } = await serviceClient
    .from("subscriptions")
    .select("plan, status, billing_type, current_period_end, has_used_trial, device_fingerprint, device_name")
    .eq("user_id", user.id)
    .single();

  let deviceMismatch = false;

  if (deviceFingerprint && subscription) {
    if (!subscription.device_fingerprint) {
      await serviceClient
        .from("subscriptions")
        .update({
          device_fingerprint: deviceFingerprint,
          device_name: deviceName || null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    } else if (subscription.device_fingerprint !== deviceFingerprint) {
      deviceMismatch = true;
    }
  }

  return NextResponse.json({
    user_id: user.id,
    email: user.email,
    plan: subscription?.plan ?? "free",
    status: subscription?.status ?? "active",
    billing_type: subscription?.billing_type ?? "monthly",
    current_period_end: subscription?.current_period_end ?? null,
    has_used_trial: subscription?.has_used_trial ?? false,
    device_mismatch: deviceMismatch,
    linked_device_name: subscription?.device_name ?? null,
  });
}
