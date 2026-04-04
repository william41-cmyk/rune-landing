"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <Box
      minH="100vh"
      bg="#f8fafc"
      sx={{ "& ::selection": { bg: "#1a84fe", color: "white" } }}
    >
      <Box maxW="720px" mx="auto" px={{ base: 5, md: 8 }} py={16}>
        <VStack align="start" spacing={2} mb={12}>
          <ChakraLink as={NextLink} href="/openstudio" _hover={{ textDecoration: "none" }}>
            <HStack spacing={2}>
              <Image src="/openstudio_2.png" alt="OpenStudio" boxSize="28px" borderRadius="7px" />
              <Text fontSize="15px" fontWeight="600" color="#111827">OpenStudio</Text>
            </HStack>
          </ChakraLink>
          <Text fontSize={{ base: "28px", md: "36px" }} fontWeight="700" color="#111827" lineHeight={1.2} mt={4}>
            Privacy Policy
          </Text>
          <Text fontSize="15px" color="#6b7280">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Text>
        </VStack>

        <VStack align="start" spacing={10}>
          <Section title="Overview">
            <P>
              OpenStudio is a macOS screen recording application developed by Rune (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the OpenStudio application and website at openstudio.gl.
            </P>
            <P>
              We are committed to protecting your privacy and only collect the minimum data necessary to provide our services. We do not sell your personal information to third parties.
            </P>
          </Section>

          <Section title="Information We Collect">
            <SubSection title="Account Information">
              <P>
                When you create an account, we collect your email address. We use passwordless authentication — we never store passwords. A one-time verification code is sent to your email each time you sign in.
              </P>
            </SubSection>

            <SubSection title="Device Information">
              <P>
                When you use the OpenStudio macOS application with a Pro subscription, we collect a hashed identifier derived from your device&apos;s hardware UUID. This identifier is a one-way SHA-256 hash, meaning we cannot reverse it to obtain your actual hardware UUID. We also collect your device&apos;s name (e.g. &ldquo;Will&apos;s MacBook Pro&rdquo;) to help you identify linked devices in your account settings.
              </P>
              <P>
                This data is used solely to enforce our single-device licensing policy and to prevent trial abuse. It is not used for tracking or advertising purposes.
              </P>
            </SubSection>

            <SubSection title="Subscription and Payment Information">
              <P>
                Payment processing is handled entirely by our payment provider, Lemon Squeezy. We do not collect, store, or have access to your credit card numbers, bank account details, or other financial information. Lemon Squeezy processes your payment independently and is subject to their own privacy policy.
              </P>
              <P>
                We do store subscription metadata including your plan type, subscription status, billing period dates, and Lemon Squeezy customer identifiers to manage your access to Pro features.
              </P>
            </SubSection>

            <SubSection title="Usage Data">
              <P>
                We store minimal usage data related to your subscription, including whether you have previously used a free trial and the date your trial started. We do not collect analytics, telemetry, screen recordings, or any content you create with OpenStudio. Your recordings remain entirely on your device.
              </P>
            </SubSection>

            <SubSection title="Local Application Data">
              <P>
                The OpenStudio application stores your preferences and configuration locally on your device at ~/openstudio/.config. Authentication tokens are stored securely in your macOS Keychain. This data never leaves your device except for authentication tokens used to communicate with our servers.
              </P>
            </SubSection>
          </Section>

          <Section title="How We Use Your Information">
            <P>We use the information we collect for the following purposes:</P>
            <BulletList items={[
              "To authenticate your identity and provide access to your account",
              "To manage your subscription and determine access to Pro features",
              "To enforce single-device licensing on Pro subscriptions",
              "To prevent abuse of the free trial system",
              "To communicate with you about your account (e.g. verification codes)",
              "To process transactions through our payment provider",
            ]} />
          </Section>

          <Section title="Third-Party Services">
            <P>We use the following third-party services to operate OpenStudio:</P>

            <SubSection title="Supabase">
              <P>
                We use Supabase for authentication and database services. Your email address, account data, and subscription information are stored on Supabase&apos;s infrastructure. Supabase&apos;s privacy policy is available at supabase.com/privacy.
              </P>
            </SubSection>

            <SubSection title="Lemon Squeezy">
              <P>
                We use Lemon Squeezy for payment processing and subscription management. When you subscribe to a paid plan, your payment information is collected and processed directly by Lemon Squeezy. Their privacy policy is available at lemonsqueezy.com/privacy.
              </P>
            </SubSection>

            <SubSection title="Sparkle (App Updates)">
              <P>
                The macOS application uses the Sparkle framework to check for and deliver software updates. Update checks are made to releases.openstudio.gl. No personally identifiable information is transmitted during update checks.
              </P>
            </SubSection>
          </Section>

          <Section title="Data Storage and Security">
            <P>
              Your data is stored on servers provided by Supabase with row-level security policies ensuring that users can only access their own subscription data. All communication between the OpenStudio application, our website, and our servers is encrypted using HTTPS/TLS.
            </P>
            <P>
              Authentication tokens are stored in the macOS Keychain, which provides hardware-level encryption. Device fingerprints are stored as one-way hashes and cannot be reversed.
            </P>
          </Section>

          <Section title="Data Retention">
            <P>
              We retain your account and subscription data for as long as your account is active. If you wish to delete your account and all associated data, please contact us at the email address below and we will process your request within 30 days.
            </P>
          </Section>

          <Section title="Cookies and Tracking">
            <P>
              The OpenStudio website stores a theme preference (light or dark mode) in your browser&apos;s local storage. We do not use tracking cookies, analytics services, or any third-party advertising or tracking tools.
            </P>
          </Section>

          <Section title="Your Rights">
            <P>You have the right to:</P>
            <BulletList items={[
              "Access the personal data we hold about you",
              "Request correction of inaccurate data",
              "Request deletion of your account and associated data",
              "Withdraw consent for data processing at any time",
              "Export your personal data in a portable format",
            ]} />
            <P>
              To exercise any of these rights, please contact us using the details below.
            </P>
          </Section>

          <Section title="Children's Privacy">
            <P>
              OpenStudio is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information promptly.
            </P>
          </Section>

          <Section title="Changes to This Policy">
            <P>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of OpenStudio after changes are posted constitutes your acceptance of the updated policy.
            </P>
          </Section>

          <Section title="Contact Us">
            <P>
              If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
            </P>
            <P>
              Email: support@openstudio.gl
            </P>
          </Section>
        </VStack>

        <Box mt={16} pt={8} borderTop="1px solid" borderColor="#e2e8f0">
          <Flex justify="space-between" align="center">
            <Text fontSize="14px" color="#9ca3af">
              © {new Date().getFullYear()} OpenStudio by Rune
            </Text>
            <HStack spacing={5}>
              <ChakraLink as={NextLink} href="/openstudio/terms" fontSize="14px" color="#9ca3af" _hover={{ color: "#111827" }}>
                Terms
              </ChakraLink>
              <ChakraLink as={NextLink} href="/openstudio/refund" fontSize="14px" color="#9ca3af" _hover={{ color: "#111827" }}>
                Refund Policy
              </ChakraLink>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <VStack align="start" spacing={4} w="100%">
      <Text fontSize="20px" fontWeight="700" color="#111827">
        {title}
      </Text>
      {children}
    </VStack>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <VStack align="start" spacing={3} w="100%">
      <Text fontSize="16px" fontWeight="600" color="#374151">
        {title}
      </Text>
      {children}
    </VStack>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="15px" color="#4b5563" lineHeight={1.75}>
      {children}
    </Text>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <VStack align="start" spacing={2} pl={4}>
      {items.map((item) => (
        <HStack key={item} align="start" spacing={3}>
          <Text fontSize="15px" color="#9ca3af" mt="2px">•</Text>
          <Text fontSize="15px" color="#4b5563" lineHeight={1.75}>{item}</Text>
        </HStack>
      ))}
    </VStack>
  );
}
