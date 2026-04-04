"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Spinner,
  Image,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { supabase } from "@/lib/supabase";

interface Subscription {
  plan: string;
  status: string;
  billing_type: string;
  lemon_squeezy_customer_id: string | null;
  current_period_end: string | null;
  has_used_trial: boolean;
  device_name: string | null;
  device_fingerprint: string | null;
}

function AccountNavbar({ onSignOut }: { onSignOut: () => void }) {
  return (
    <Box
      as="nav"
      position="fixed"
      top={4}
      left="50%"
      transform="translateX(-50%)"
      zIndex={100}
      w={{ base: "calc(100% - 32px)", md: "auto" }}
      minW={{ md: "500px" }}
      maxW="600px"
    >
      <Flex
        bg="rgba(255, 255, 255, 0.85)"
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor="#e2e8f0"
        borderRadius="full"
        px={5}
        h="48px"
        align="center"
        justify="space-between"
        boxShadow="0 2px 12px rgba(0,0,0,0.06)"
      >
        <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <HStack spacing={2}>
            <Image
              src="/openstudio_2.png"
              alt="OpenStudio"
              boxSize="26px"
              borderRadius="6px"
            />
            <Text fontSize="sm" fontWeight="bold" color="#111827">
              OpenStudio
            </Text>
          </HStack>
        </ChakraLink>

        <Button
          variant="ghost"
          fontSize="13px"
          fontWeight="medium"
          color="#6b7280"
          _hover={{ color: "#111827", bg: "rgba(0,0,0,0.04)" }}
          size="sm"
          borderRadius="full"
          h="32px"
          onClick={onSignOut}
        >
          Sign out
        </Button>
      </Flex>
    </Box>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<Box minH="100vh" bg="#f8fafc" display="flex" alignItems="center" justifyContent="center"><Spinner color="#1a84fe" size="lg" /></Box>}>
      <AccountContent />
    </Suspense>
  );
}

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const pollingStartedRef = useRef(false);

  useEffect(() => {
    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setEmail(session.user.email ?? "");
      setUserId(session.user.id);

      const { data } = await supabase
        .from("subscriptions")
        .select("plan, status, billing_type, lemon_squeezy_customer_id, current_period_end, has_used_trial, device_name, device_fingerprint")
        .eq("user_id", session.user.id)
        .single();

      setSubscription(
        data ?? {
          plan: "free",
          status: "active",
          billing_type: "monthly",
          lemon_squeezy_customer_id: null,
          current_period_end: null,
          has_used_trial: false,
          device_name: null,
          device_fingerprint: null,
        }
      );
      setLoading(false);

      if (searchParams.get("checkout") === "true" && !pollingStartedRef.current) {
        pollingStartedRef.current = true;
        window.history.replaceState(null, "", "/openstudio/account");
        startPolling();
      }
    }

    load();

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function startPolling() {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setIsPolling(true);
    const interval = setInterval(async () => {
      const { data: { session: s } } = await supabase.auth.getSession();
      if (!s) return;
      const { data } = await supabase
        .from("subscriptions")
        .select("plan, status, billing_type, lemon_squeezy_customer_id, current_period_end, has_used_trial, device_name, device_fingerprint")
        .eq("user_id", s.user.id)
        .single();
      if (data) setSubscription(data);
      if (data?.plan === "pro") {
        clearInterval(interval);
        pollingRef.current = null;
        setIsPolling(false);
      }
    }, 20000);
    pollingRef.current = interval;
  }

  async function handleUnlinkDevice() {
    setIsUnlinking(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const res = await fetch("/openstudio/api/unlink-device", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (res.ok) {
      setSubscription((prev) => prev ? { ...prev, device_fingerprint: null, device_name: null } : prev);
    }
    setIsUnlinking(false);
  }

  function handleManageSubscription() {
    window.open("https://openstudioatrune.lemonsqueezy.com/billing", "_blank");
  }

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg="#f8fafc"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
      >
        <Spinner color="#1a84fe" size="lg" />
      </Box>
    );
  }

  const isPro = subscription?.plan === "pro";
  const isLifetime = subscription?.billing_type === "lifetime";
  const isOnTrial = subscription?.status === "on_trial";
  const isCancelled = subscription?.status === "cancelled";
  const isPaymentFailed = subscription?.status === "past_due";
  const hasUsedTrial = subscription?.has_used_trial ?? false;
  const initial = email ? email[0].toUpperCase() : "?";

  return (
    <Box minH="100vh" bg="#f8fafc" sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}>
      <AccountNavbar onSignOut={handleSignOut} />

      <Box pt={{ base: 24, md: 28 }} pb={16} px={4} maxW="520px" mx="auto">
        <VStack spacing={6} align="stretch">
          <VStack spacing={4} align="center" pb={2}>
            <Flex
              w="64px"
              h="64px"
              borderRadius="full"
              bg="linear-gradient(135deg, #25b4dd 0%, #1a84fe 100%)"
              align="center"
              justify="center"
            >
              <Text fontSize="24px" fontWeight="bold" color="white">
                {initial}
              </Text>
            </Flex>
            <VStack spacing={1}>
              <Text fontSize="22px" fontWeight="600" color="#111827">
                {email}
              </Text>
              <Text fontSize="14px" color="#9ca3af">
                Member since {new Date().getFullYear()}
              </Text>
            </VStack>
          </VStack>

          <Box
            bg="white"
            border="1px solid"
            borderColor="#e2e8f0"
            borderRadius="16px"
            overflow="hidden"
            boxShadow="0 1px 3px rgba(0,0,0,0.04)"
          >
            <Box px={6} py={5} borderBottom="1px solid" borderColor="#f1f5f9">
              <Text fontSize="13px" fontWeight="600" color="#9ca3af" textTransform="uppercase" letterSpacing="0.05em">
                Subscription
              </Text>
            </Box>

            <VStack spacing={0} align="stretch" divider={<Box borderBottom="1px solid" borderColor="#f1f5f9" />}>
              <HStack justify="space-between" px={6} py={4}>
                <Text fontSize="14px" color="#6b7280">Plan</Text>
                {isLifetime && isPro ? (
                  <Text fontSize="14px" fontWeight="600" color="#111827">
                    Pro Lifetime
                  </Text>
                ) : (
                  <HStack spacing={2}>
                    <Text fontSize="14px" fontWeight="600" color="#111827">
                      {isPro ? "Pro" : "Free"}
                    </Text>
                    <Box
                      px={2}
                      py="2px"
                      borderRadius="full"
                      fontSize="11px"
                      fontWeight="600"
                      bg={isOnTrial ? "rgba(245, 158, 11, 0.1)" : isCancelled ? "rgba(239, 68, 68, 0.1)" : isPaymentFailed ? "rgba(239, 68, 68, 0.1)" : isPro ? "rgba(34, 197, 94, 0.1)" : "rgba(107, 114, 128, 0.08)"}
                      color={isOnTrial ? "#d97706" : isCancelled ? "#dc2626" : isPaymentFailed ? "#dc2626" : isPro ? "#16a34a" : "#9ca3af"}
                    >
                      {isOnTrial ? "Trial" : isCancelled ? "Cancelling" : isPaymentFailed ? "Past due" : subscription?.status ?? "active"}
                    </Box>
                  </HStack>
                )}
              </HStack>

              {isPro && !isLifetime && (
                <HStack justify="space-between" px={6} py={4}>
                  <Text fontSize="14px" color="#6b7280">Price</Text>
                  <Text fontSize="14px" fontWeight="600" color="#111827">$5/month</Text>
                </HStack>
              )}

              {isOnTrial && subscription?.current_period_end && (
                <HStack justify="space-between" px={6} py={4}>
                  <Text fontSize="14px" color="#6b7280">Trial ends</Text>
                  <Text fontSize="14px" fontWeight="600" color="#111827">
                    {new Date(subscription.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </Text>
                </HStack>
              )}

              {isCancelled && subscription?.current_period_end && (
                <HStack justify="space-between" px={6} py={4}>
                  <Text fontSize="14px" color="#6b7280">Access until</Text>
                  <Text fontSize="14px" fontWeight="600" color="#dc2626">
                    {new Date(subscription.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </Text>
                </HStack>
              )}

              {isPaymentFailed && (
                <HStack justify="space-between" px={6} py={4}>
                  <Text fontSize="14px" color="#dc2626">Payment failed — please update your billing info to keep access.</Text>
                </HStack>
              )}

              {!isOnTrial && !isCancelled && !isPaymentFailed && !isLifetime && isPro && subscription?.current_period_end && (
                <HStack justify="space-between" px={6} py={4}>
                  <Text fontSize="14px" color="#6b7280">Renews</Text>
                  <Text fontSize="14px" fontWeight="600" color="#111827">
                    {new Date(subscription.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </Text>
                </HStack>
              )}
            </VStack>

            <Box px={6} py={5} borderTop="1px solid" borderColor="#f1f5f9">
              {isPro && isLifetime ? (
                <Text fontSize="14px" fontWeight="500" color="#16a34a" textAlign="center">
                  Lifetime access — you're all set
                </Text>
              ) : isPro ? (
                <Button
                  variant="outline"
                  w="100%"
                  h="40px"
                  fontSize="14px"
                  fontWeight="600"
                  color="#374151"
                  borderColor="#e2e8f0"
                  borderRadius="10px"
                  _hover={{ bg: "#f8fafc", borderColor: "#d1d5db" }}
                  onClick={handleManageSubscription}
                >
                  Manage subscription
                </Button>
              ) : (
                <Button
                  as={isPolling ? undefined : NextLink}
                  href={isPolling ? undefined : "/plans"}
                  w="100%"
                  h="40px"
                  bg="#1a84fe"
                  color="white"
                  fontSize="14px"
                  fontWeight="600"
                  borderRadius="10px"
                  _hover={{ bg: "#1574e0" }}
                  _active={{ bg: "#1264c4" }}
                  boxShadow="0 1px 2px rgba(26, 132, 254, 0.2)"
                  isDisabled={isPolling}
                >
                  {isPolling ? <Spinner size="sm" /> : (hasUsedTrial ? "Upgrade to Pro" : "Start free trial")}
                </Button>
              )}
            </Box>
          </Box>

          {isPro && subscription?.device_fingerprint && (
            <Box
              bg="white"
              border="1px solid"
              borderColor="#e2e8f0"
              borderRadius="16px"
              overflow="hidden"
              boxShadow="0 1px 3px rgba(0,0,0,0.04)"
            >
              <HStack px={6} py={5} borderBottom="1px solid" borderColor="#f1f5f9">
                <Text fontSize="13px" fontWeight="600" color="#9ca3af" textTransform="uppercase" letterSpacing="0.05em">
                  Linked Device
                </Text>
              </HStack>
              <HStack px={6} py={5} justify="space-between">
                <HStack spacing={3}>
                  <Text fontSize="20px">💻</Text>
                  <VStack align="start" spacing={0}>
                    <Text fontSize="14px" fontWeight="600" color="#111827">
                      {subscription.device_name || "Mac"}
                    </Text>
                    <Text fontSize="12px" color="#9ca3af">
                      Currently linked
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  size="sm"
                  variant="outline"
                  fontSize="12px"
                  fontWeight="600"
                  color="#6b7280"
                  borderColor="#e2e8f0"
                  borderRadius="8px"
                  _hover={{ bg: "#f8fafc", borderColor: "#d1d5db" }}
                  onClick={handleUnlinkDevice}
                  isLoading={isUnlinking}
                >
                  Unlink
                </Button>
              </HStack>
            </Box>
          )}

          <Box
            bg="white"
            border="1px solid"
            borderColor="#e2e8f0"
            borderRadius="16px"
            overflow="hidden"
            boxShadow="0 1px 3px rgba(0,0,0,0.04)"
          >
            <HStack px={6} py={5} borderBottom="1px solid" borderColor="#f1f5f9" justify="space-between">
              <Text fontSize="13px" fontWeight="600" color="#9ca3af" textTransform="uppercase" letterSpacing="0.05em">
                What you get
              </Text>
              <Button
                as={ChakraLink}
                href="https://openstudio.gl"
                isExternal
                size="xs"
                h="28px"
                px={3}
                bg="#111827"
                color="white"
                fontSize="12px"
                fontWeight="600"
                borderRadius="full"
                _hover={{ bg: "#1f2937", textDecoration: "none" }}
              >
                Download
              </Button>
            </HStack>

            <HStack justify="space-between" px={6} py={3} borderBottom="1px solid" borderColor="#f1f5f9">
              <Box />
              <HStack spacing={4}>
                <Box w="60px" textAlign="center">
                  <Text fontSize="11px" fontWeight="600" color="#9ca3af" textTransform="uppercase">Free</Text>
                </Box>
                <Box w="60px" textAlign="center">
                  <Text fontSize="11px" fontWeight="600" color="#9ca3af" textTransform="uppercase">Pro</Text>
                </Box>
              </HStack>
            </HStack>

            <VStack spacing={0} align="stretch" divider={<Box borderBottom="1px solid" borderColor="#f1f5f9" />}>
              <FeatureRow label="Screen recording" free pro />
              <FeatureRow label="Basic editing" free pro />
              <FeatureRow label="Custom backgrounds" free pro />
              <FeatureRow label="Export to MP4" pro />
              <FeatureRow label="Export to GIF" pro />
            </VStack>
          </Box>

        </VStack>
      </Box>
    </Box>
  );
}

function FeatureRow({ label, free, pro }: { label: string; free?: boolean; pro?: boolean }) {
  return (
    <HStack justify="space-between" px={6} py={3}>
      <Text fontSize="14px" color="#374151">{label}</Text>
      <HStack spacing={4}>
        <Box w="60px" textAlign="center">
          <Text fontSize="13px" color={free ? "#16a34a" : "#d1d5db"}>
            {free ? "\u2713" : "\u2014"}
          </Text>
        </Box>
        <Box w="60px" textAlign="center">
          <Text fontSize="13px" color={pro ? "#16a34a" : "#d1d5db"}>
            {pro ? "\u2713" : "\u2014"}
          </Text>
        </Box>
      </HStack>
    </HStack>
  );
}
