"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Image,
  PinInput,
  PinInputField,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [checking, setChecking] = useState(true);
  const [lastOtpSentAt, setLastOtpSentAt] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/account");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    const now = Date.now();
    if (now - lastOtpSentAt < 60000) {
      setError("Please wait 60 seconds before requesting another code.");
      return;
    }
    setError("");
    setLoading(true);

    const { error: checkError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    if (checkError) {
      if (checkError.message.toLowerCase().includes("signups not allowed")) {
        setIsNewUser(true);
        setLoading(false);
        return;
      }
      setError(checkError.message);
      setLoading(false);
      return;
    }

    setLastOtpSentAt(Date.now());
    setCodeSent(true);
    setLoading(false);
  }

  async function handleCreateAccount() {
    const now = Date.now();
    if (now - lastOtpSentAt < 60000) {
      setError("Please wait 60 seconds before requesting another code.");
      return;
    }
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setLastOtpSentAt(Date.now());
    setCodeSent(true);
    setLoading(false);
  }

  async function handleVerifyCode(code: string) {
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/plans");
  }

  if (checking) return null;

  return (
    <Box
      minH="100vh"
      bg="#f8fafc"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
      px={4}
    >
      <Box
        w="100%"
        maxW="400px"
        bg="white"
        border="1px solid"
        borderColor="#e2e8f0"
        borderRadius="xl"
        p={8}
        boxShadow="0 1px 3px rgba(0,0,0,0.06)"
      >
        {isNewUser && !codeSent ? (
          <VStack spacing={5} align="stretch">
            <VStack spacing={3} align="center">
              <Image
                src="/openstudio_2.png"
                alt="OpenStudio"
                boxSize="48px"
                borderRadius="12px"
              />
              <VStack spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="#111827">
                  Create your account
                </Text>
                <Text fontSize="sm" color="#6b7280" textAlign="center">
                  No account found for {email}. Create one to get started.
                </Text>
              </VStack>
            </VStack>

            {error && (
              <Box
                bg="rgba(239, 68, 68, 0.08)"
                border="1px solid"
                borderColor="rgba(239, 68, 68, 0.2)"
                borderRadius="md"
                px={3}
                py={2}
              >
                <Text fontSize="sm" color="#dc2626">
                  {error}
                </Text>
              </Box>
            )}

            <Button
              bg="#1a84fe"
              color="white"
              _hover={{ bg: "#1574e0" }}
              _active={{ bg: "#1264c4" }}
              fontWeight="semibold"
              fontSize="sm"
              isLoading={loading}
              onClick={handleCreateAccount}
              w="100%"
              borderRadius="lg"
            >
              Create account & send code
            </Button>

            <Button
              variant="ghost"
              fontSize="sm"
              color="#6b7280"
              _hover={{ color: "#111827" }}
              onClick={() => {
                setIsNewUser(false);
                setEmail("");
                setError("");
              }}
            >
              Use a different email
            </Button>

            <Text px="30px" fontSize="11px" color="#9ca3af" textAlign="center" lineHeight={1.5}>
              By creating an account, you agree to our{" "}
              <ChakraLink as={NextLink} href="/terms" color="#6b7280" _hover={{ color: "#111827" }}>
                Terms of Service
              </ChakraLink>{" "}
              and{" "}
              <ChakraLink as={NextLink} href="/privacy" color="#6b7280" _hover={{ color: "#111827" }}>
                Privacy Policy
              </ChakraLink>
            </Text>
          </VStack>
        ) : !codeSent ? (
          <VStack as="form" onSubmit={handleSendCode} spacing={5} align="stretch">
            <VStack spacing={3} align="center">
              <Image
                src="/openstudio_2.png"
                alt="OpenStudio"
                boxSize="48px"
                borderRadius="12px"
              />
              <VStack spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="#111827">
                  Create your account
                </Text>
                <Text fontSize="sm" color="#6b7280">
                  We&apos;ll send a code to your email
                </Text>
              </VStack>
            </VStack>

            {error && (
              <Box
                bg="rgba(239, 68, 68, 0.08)"
                border="1px solid"
                borderColor="rgba(239, 68, 68, 0.2)"
                borderRadius="md"
                px={3}
                py={2}
              >
                <Text fontSize="sm" color="#dc2626">
                  {error}
                </Text>
              </Box>
            )}

            <Box>
              <Text fontSize="sm" fontWeight="medium" color="#374151" mb={1}>
                Email
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                bg="white"
                border="1px solid"
                borderColor="#d1d5db"
                color="#111827"
                _placeholder={{ color: "#9ca3af" }}
                _hover={{ borderColor: "#9ca3af" }}
                _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                fontSize="sm"
                sx={{ "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": { WebkitBoxShadow: "0 0 0px 1000px white inset", WebkitTextFillColor: "#111827" } }}
                required
              />
            </Box>

            <Button
              type="submit"
              bg="#1a84fe"
              color="white"
              _hover={{ bg: "#1574e0" }}
              _active={{ bg: "#1264c4" }}
              fontWeight="semibold"
              fontSize="sm"
              isLoading={loading}
              w="100%"
              borderRadius="lg"
            >
              Continue
            </Button>

            <Text fontSize="sm" color="#6b7280" textAlign="center">
              Already have an account?{" "}
              <ChakraLink as={NextLink} href="/login" color="#1a84fe" fontWeight="600" _hover={{ textDecoration: "underline" }}>
                Sign in
              </ChakraLink>
            </Text>

            <Text px="30px" fontSize="11px" color="#9ca3af" textAlign="center" lineHeight={1.5}>
              By creating an account, you agree to our{" "}
              <ChakraLink as={NextLink} href="/terms" color="#6b7280" _hover={{ color: "#111827" }}>
                Terms of Service
              </ChakraLink>{" "}
              and{" "}
              <ChakraLink as={NextLink} href="/privacy" color="#6b7280" _hover={{ color: "#111827" }}>
                Privacy Policy
              </ChakraLink>
            </Text>
          </VStack>
        ) : (
          <VStack spacing={5} align="stretch">
            <VStack spacing={3} align="center">
              <Image
                src="/openstudio_2.png"
                alt="OpenStudio"
                boxSize="48px"
                borderRadius="12px"
              />
              <VStack spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="#111827">
                  Enter your code
                </Text>
                <Text fontSize="sm" color="#6b7280" textAlign="center">
                  We sent a 6-digit code to {email}
                </Text>
              </VStack>
            </VStack>

            {error && (
              <Box
                bg="rgba(239, 68, 68, 0.08)"
                border="1px solid"
                borderColor="rgba(239, 68, 68, 0.2)"
                borderRadius="md"
                px={3}
                py={2}
              >
                <Text fontSize="sm" color="#dc2626">
                  {error}
                </Text>
              </Box>
            )}

            <HStack justify="center">
              <PinInput
                otp
                size="lg"
                value={otp}
                onChange={setOtp}
                onComplete={handleVerifyCode}
              >
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{ borderColor: "#1a84fe", boxShadow: "0 0 0 1px #1a84fe" }}
                />
              </PinInput>
            </HStack>

            <Button
              variant="ghost"
              fontSize="sm"
              color="#6b7280"
              _hover={{ color: "#111827" }}
              onClick={() => {
                setCodeSent(false);
                setOtp("");
                setError("");
              }}
            >
              Use a different email
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
}
