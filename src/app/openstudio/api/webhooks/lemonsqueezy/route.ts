import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import crypto from "crypto";

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") ?? "";

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const eventName = payload.meta?.event_name;
  const customData = payload.meta?.custom_data;
  const attrs = payload.data?.attributes;

  if (!customData?.user_id) {
    return NextResponse.json(
      { error: "Missing user_id in custom_data" },
      { status: 400 }
    );
  }

  const userId = customData.user_id;
  const supabase = createServiceClient();

  if (
    eventName === "subscription_created" ||
    eventName === "subscription_updated"
  ) {
    const status = attrs.status;
    const plan =
      status === "active" || status === "on_trial" ? "pro" : "free";

    const updateData: Record<string, unknown> = {
      user_id: userId,
      plan,
      status,
      billing_type: "monthly",
      lemon_squeezy_subscription_id: String(payload.data.id),
      lemon_squeezy_customer_id: String(attrs.customer_id),
      lemon_squeezy_variant_id: String(attrs.variant_id),
      current_period_end: attrs.renews_at,
      updated_at: new Date().toISOString(),
    };

    if (status === "on_trial") {
      updateData.has_used_trial = true;
      updateData.trial_started_at = new Date().toISOString();
    }

    console.log("Webhook upsert data:", JSON.stringify(updateData));
    const { error: upsertError } = await supabase.from("subscriptions").upsert(
      updateData,
      { onConflict: "user_id" }
    );
    if (upsertError) {
      console.error("Upsert error:", JSON.stringify(upsertError));
    }
  }

  if (eventName === "subscription_cancelled") {
    await supabase
      .from("subscriptions")
      .update({
        status: "cancelled",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .neq("billing_type", "lifetime");
  }

  if (
    eventName === "subscription_expired" ||
    eventName === "subscription_payment_failed"
  ) {
    await supabase
      .from("subscriptions")
      .update({
        plan: "free",
        status: attrs.status,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .neq("billing_type", "lifetime");
  }

  if (eventName === "subscription_paused") {
    await supabase
      .from("subscriptions")
      .update({
        plan: "free",
        status: "paused",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .neq("billing_type", "lifetime");
  }

  if (eventName === "subscription_resumed" || eventName === "subscription_unpaused") {
    const status = attrs.status;
    const plan = status === "active" || status === "on_trial" ? "pro" : "free";
    await supabase
      .from("subscriptions")
      .update({
        plan,
        status,
        current_period_end: attrs.renews_at,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  }

  if (eventName === "order_created") {
    const orderStatus = attrs.status;
    if (orderStatus === "paid") {
      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          plan: "pro",
          status: "active",
          billing_type: "lifetime",
          lemon_squeezy_order_id: String(payload.data.id),
          lemon_squeezy_customer_id: String(attrs.customer_id),
          current_period_end: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
    }
  }

  return NextResponse.json({ received: true });
}
