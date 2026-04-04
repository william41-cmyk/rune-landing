"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  VStack,
  HStack,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";

export default function PlansPage() {
  const router = useRouter();
  const [isLifetime, setIsLifetime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [hasUsedTrial, setHasUsedTrial] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/signup");
        return;
      }
      setEmail(session.user.email ?? "");
      setUserId(session.user.id);

      supabase
        .from("subscriptions")
        .select("has_used_trial")
        .eq("user_id", session.user.id)
        .single()
        .then(({ data }) => {
          setHasUsedTrial(data?.has_used_trial ?? false);
          setLoading(false);
        });
    });
  }, [router]);

  function handleSelectPlan(type: "monthly" | "lifetime") {
    let checkoutUrl: string | undefined;
    if (type === "lifetime") {
      checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_CHECKOUT_URL;
    } else if (hasUsedTrial) {
      checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_NOTRIAL_CHECKOUT_URL;
    } else {
      checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
    }
    if (checkoutUrl) {
      window.open(
        `${checkoutUrl}?checkout[email]=${encodeURIComponent(email)}&checkout[custom][user_id]=${userId}`,
        "_blank"
      );
      router.push("/account?checkout=true");
    }
  }

  if (loading) {
    return (
      <Box minH="100vh" bg="#0a0a0a" display="flex" alignItems="center" justifyContent="center" sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}>
        <Spinner color="white" size="lg" />
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bgImage="url('/openstudio-pricing-background.webp')"
      bgSize="cover"
      bgPosition="center"
      position="relative"
      display="flex"
      sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(ellipse at center, transparent 10%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.9) 100%)"
        pointerEvents="none"
      />

      <VStack spacing={8} position="relative" zIndex={1} w="100%" maxW="860px" py={16}>
        <VStack spacing={4} textAlign="center">
          <HStack spacing={4} justify="center">
          <Text
            fontSize="15px"
            fontWeight="600"
            color={!isLifetime ? "white" : "rgba(255,255,255,0.4)"}
            transition="color 0.3s"
            cursor="pointer"
            onClick={() => isLifetime && setIsLifetime(false)}
          >
            Monthly
          </Text>
          <Box
            as="button"
            onClick={() => setIsLifetime(!isLifetime)}
            w="72px"
            h="36px"
            borderRadius="full"
            position="relative"
            cursor="pointer"
            overflow="hidden"
            border="1px solid rgba(255,255,255,0.15)"
            boxShadow="0 2px 8px rgba(0,0,0,0.3)"
            flexShrink={0}
          >
            <Box
              position="absolute"
              inset={0}
              bgImage={isLifetime ? "url('/switch-2.png')" : "url('/switch-1.png')"}
              bgSize="cover"
              bgPosition="center"
              transition="opacity 0.3s"
            />
            <Box
              position="absolute"
              top="3px"
              left={isLifetime ? "39px" : "3px"}
              w="28px"
              h="28px"
              borderRadius="full"
              bg="white"
              boxShadow="0 1px 4px rgba(0,0,0,0.3)"
              transition="left 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            />
          </Box>
          <Text
            fontSize="15px"
            fontWeight="600"
            color={isLifetime ? "white" : "rgba(255,255,255,0.4)"}
            transition="color 0.3s"
            cursor="pointer"
            onClick={() => !isLifetime && setIsLifetime(true)}
          >
            Lifetime
          </Text>
        </HStack>
          <Text
            fontSize={{ base: "28px", md: "44px" }}
            fontWeight="400"
            color="white"
            letterSpacing="-0.02em"
          >
            Choose your plan
          </Text>
          <Text fontSize="17px" fontWeight="500" color="rgba(255,255,255,0.5)">
            Start for free or unlock everything with Pro.
          </Text>
        </VStack>

        <Flex
          w="100%"
          gap={5}
          direction={{ base: "column", md: "row" }}
          align="stretch"
        >
          <Box
            flex={1}
            borderRadius="2xl"
            overflow="hidden"
            bg="rgba(0,0,0,0.35)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255,255,255,0.1)"
          >
            <Box p={8} pb={0}>
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Text fontSize="32px" fontWeight="400" color="white">
                  Free
                </Text>
                <Text fontSize="32px" fontWeight="400" color="white">
                  $0
                </Text>
              </Flex>
              <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.5)" mb={6} lineHeight={1.6}>
                Try OpenStudio with full recording and editing features. Style your videos and preview before upgrading.
              </Text>
              <Box
                as="button"
                onClick={() => router.push("/account")}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                bg="rgba(255,255,255,0.1)"
                border="1px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize="15px"
                fontWeight="600"
                borderRadius="full"
                h="48px"
                w="100%"
                cursor="pointer"
                transition="all 0.2s"
                boxShadow="inset 0 1px 0 0 rgba(255,255,255,0.1)"
                _hover={{ bg: "rgba(255,255,255,0.18)" }}
              >
                Continue free
              </Box>
            </Box>

            <Box px={8} pt={6} pb={8}>
              <Box w="100%" h="1px" bg="rgba(255,255,255,0.1)" mb={5} />
              <Text fontSize="13px" fontWeight="600" color="rgba(255,255,255,0.4)" mb={4}>
                Get a feel for OpenStudio.
              </Text>
              <VStack spacing={3} align="stretch">
                {[
                  "Record your screen",
                  "Full editing & timeline",
                  "Custom backgrounds & styling",
                  "Auto zoom & annotations",
                  "Preview your exports",
                  "macOS native app",
                ].map((item) => (
                  <HStack key={item} spacing={2.5}>
                    <Text fontSize="14px" color="rgba(255,255,255,0.3)">&#10003;</Text>
                    <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.85)">{item}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Box>

          <Box
            flex={1}
            borderRadius="2xl"
            overflow="hidden"
            bg="rgba(0,0,0,0.5)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255,255,255,0.15)"
          >
            <Box p={8} pb={0}>
              <Flex justify="space-between" align="flex-start" mb={4}>
                <Text fontSize="32px" fontWeight="400" color="white">
                  Pro
                </Text>
                <HStack spacing={1}>
                  <Text fontSize="32px" fontWeight="400" color="white">
                    {isLifetime ? "$29" : "$5"}
                  </Text>
                  <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.5)" alignSelf="flex-end" pb={1}>
                    {isLifetime ? "once" : "/mo"}
                  </Text>
                </HStack>
              </Flex>
              <Text fontSize="15px" fontWeight="500" color="rgba(255,255,255,0.5)" mb={6} lineHeight={1.6}>
                Unlock exporting and get access to all current and future features.
              </Text>
              <Box
                as="button"
                onClick={() => handleSelectPlan(isLifetime ? "lifetime" : "monthly")}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                bg="white"
                color="#0a0a0a"
                fontSize="15px"
                fontWeight="600"
                borderRadius="full"
                h="48px"
                w="100%"
                cursor="pointer"
                transition="all 0.2s"
                boxShadow="0 4px 16px rgba(0,0,0,0.3)"
                _hover={{ bg: "rgba(255,255,255,0.9)" }}
              >
                {isLifetime ? "Buy once" : hasUsedTrial ? "Get Pro" : "3 day free trial"} <Box as="span">&#8594;</Box>
              </Box>
            </Box>

            <Box px={8} pt={6} pb={8}>
              <Box w="100%" h="1px" bg="rgba(255,255,255,0.1)" mb={5} />
              <Text fontSize="13px" fontWeight="600" color="rgba(255,255,255,0.4)" mb={4}>
                Everything you need to ship.
              </Text>
              <VStack spacing={3} align="stretch">
                {(isLifetime ? [
                  "Everything in Free",
                  "Export in any resolution",
                  "Unlimited exports",
                  "Priority support",
                  "All future updates",
                  "Pay once, own forever",
                ] : [
                  "Everything in Free",
                  "Export in any resolution",
                  "Unlimited exports",
                  "Priority support",
                  "All future updates",
                  "Cancel anytime",
                ]).map((item) => (
                  <HStack key={item} spacing={2.5}>
                    <Text fontSize="14px" color="rgba(255,255,255,0.35)">&#10003;</Text>
                    <Text fontSize="15px" fontWeight="600" color="white">{item}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Box>
        </Flex>

      </VStack>
    </Box>
  );
}
