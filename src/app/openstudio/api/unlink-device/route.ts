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

  const serviceClient = createServiceClient();

  await serviceClient
    .from("subscriptions")
    .update({
      device_fingerprint: null,
      device_name: null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  return NextResponse.json({ success: true });
}
