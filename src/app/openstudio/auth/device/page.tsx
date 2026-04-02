"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  Spinner,
} from "@chakra-ui/react";
import { supabase } from "@/lib/supabase";

export default function DeviceAuthPage() {
  return (
    <Suspense
      fallback={
        <Box minH="100vh" bg="#f8fafc" display="flex" alignItems="center" justifyContent="center">
          <Spinner color="#1a84fe" />
        </Box>
      }
    >
      <DeviceAuthContent />
    </Suspense>
  );
}

function DeviceAuthContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get("state") ?? "";
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [lastOtpSentAt, setLastOtpSentAt] = useState(0);

  useEffect(() => {
    if (!stateParam) {
      setError("Invalid request. Please try again from the app.");
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setHasSession(true);
      }
      setChecking(false);
    });
  }, [stateParam]);

  function redirectToApp(session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: { id: string; email?: string };
  }) {
    setRedirecting(true);
    const params = new URLSearchParams({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: String(session.expires_in),
      user_id: session.user.id,
      email: session.user.email || "",
      state: stateParam,
    });
    window.location.href = `openstudio://auth?${params.toString()}`;
  }

  async function handleContinue() {
    setLoading(true);
    setError("");
    const { data, error: err } = await supabase.auth.getSession();
    if (err || !data.session) {
      setError("Session expired. Please sign in again.");
      setHasSession(false);
      setLoading(false);
      return;
    }
    redirectToApp({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      user: {
        id: data.session.user.id,
        email: data.session.user.email,
      },
    });
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
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

    const { data, error: authError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      redirectToApp({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_in: data.session.expires_in,
        user: {
          id: data.session.user.id,
          email: data.session.user.email,
        },
      });
    }
  }

  if (checking) {
    return (
      <Box
        minH="100vh"
        bg="#f8fafc"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
      >
        <Spinner color="#1a84fe" />
      </Box>
    );
  }

  if (redirecting) {
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
          <VStack spacing={4} align="center">
            <Image
              src="/openstudio_2.png"
              alt="OpenStudio"
              boxSize="48px"
              borderRadius="12px"
            />
            <VStack spacing={1}>
              <Text fontSize="xl" fontWeight="bold" color="#111827">
                Opening OpenStudio...
              </Text>
              <Text fontSize="sm" color="#6b7280" textAlign="center">
                You can close this tab and return to the app
              </Text>
            </VStack>
            <Spinner size="sm" color="#1a84fe" />
          </VStack>
        </Box>
      </Box>
    );
  }

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
        {hasSession ? (
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
                  Open in OpenStudio
                </Text>
                <Text fontSize="sm" color="#6b7280" textAlign="center">
                  You&apos;re signed in. Click below to continue to the app.
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
              onClick={handleContinue}
              w="100%"
              borderRadius="lg"
            >
              Continue to OpenStudio
            </Button>
          </VStack>
        ) : !codeSent ? (
          <VStack
            as="form"
            onSubmit={handleSendCode}
            spacing={5}
            align="stretch"
          >
            <VStack spacing={3} align="center">
              <Image
                src="/openstudio_2.png"
                alt="OpenStudio"
                boxSize="48px"
                borderRadius="12px"
              />
              <VStack spacing={1}>
                <Text fontSize="xl" fontWeight="bold" color="#111827">
                  Sign in to OpenStudio
                </Text>
                <Text fontSize="sm" color="#6b7280" textAlign="center">
                  Sign in to connect your account to the app
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
                _focus={{
                  borderColor: "#1a84fe",
                  boxShadow: "0 0 0 1px #1a84fe",
                }}
                fontSize="sm"
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
              Send code
            </Button>
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
                  _focus={{
                    borderColor: "#1a84fe",
                    boxShadow: "0 0 0 1px #1a84fe",
                  }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{
                    borderColor: "#1a84fe",
                    boxShadow: "0 0 0 1px #1a84fe",
                  }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{
                    borderColor: "#1a84fe",
                    boxShadow: "0 0 0 1px #1a84fe",
                  }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{
                    borderColor: "#1a84fe",
                    boxShadow: "0 0 0 1px #1a84fe",
                  }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{
                    borderColor: "#1a84fe",
                    boxShadow: "0 0 0 1px #1a84fe",
                  }}
                />
                <PinInputField
                  bg="white"
                  border="1px solid"
                  borderColor="#d1d5db"
                  color="#111827"
                  _focus={{
                    borderColor: "#1a84fe",
                    boxShadow: "0 0 0 1px #1a84fe",
                  }}
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
