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

export default function TermsOfServicePage() {
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
            Terms of Service
          </Text>
          <Text fontSize="15px" color="#6b7280">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Text>
        </VStack>

        <VStack align="start" spacing={10}>
          <Section title="1. Agreement to Terms">
            <P>
              By creating an account, downloading, installing, or using OpenStudio (the &ldquo;Application&rdquo;) or the website at openstudio.gl (the &ldquo;Website&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do not use OpenStudio.
            </P>
            <P>
              OpenStudio is developed and operated by Rune (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). These Terms constitute a legally binding agreement between you and Rune.
            </P>
          </Section>

          <Section title="2. Description of Service">
            <P>
              OpenStudio is a macOS screen recording application that allows users to record, edit, and export screen recordings. The Application is available as a free version with limited functionality and a paid Pro subscription that unlocks additional features including video export.
            </P>
          </Section>

          <Section title="3. Account Registration">
            <P>
              To use certain features of OpenStudio, you must create an account using a valid email address. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account.
            </P>
            <P>
              You may not create multiple accounts to circumvent trial limitations, device restrictions, or any other policies. We reserve the right to suspend or terminate accounts that violate this provision.
            </P>
          </Section>

          <Section title="4. Subscriptions and Payments">
            <SubSection title="Free Plan">
              <P>
                The free plan provides access to recording and editing features but does not include video export functionality.
              </P>
            </SubSection>

            <SubSection title="Free Trial">
              <P>
                New users may be eligible for a one-time 3-day free trial of the Pro plan. Each user is entitled to one free trial only. Attempting to obtain additional trials through new accounts, different email addresses, or any other means constitutes a violation of these Terms. We use device identification technology to enforce this limitation.
              </P>
            </SubSection>

            <SubSection title="Pro Subscription (Monthly)">
              <P>
                The Pro monthly subscription is billed at $5.00 USD per month. Your subscription will automatically renew each month unless you cancel before the end of your current billing period. Cancellation takes effect at the end of the current billing period — you retain access to Pro features until that date.
              </P>
            </SubSection>

            <SubSection title="Pro Subscription (Lifetime)">
              <P>
                The lifetime plan is a one-time payment of $29.00 USD that grants permanent access to all Pro features, including all future updates. The lifetime plan is non-recurring and does not require cancellation.
              </P>
            </SubSection>

            <SubSection title="Payment Processing">
              <P>
                All payments are processed by Lemon Squeezy. By subscribing to a paid plan, you also agree to Lemon Squeezy&apos;s terms of service. We do not store your payment information.
              </P>
            </SubSection>

            <SubSection title="Price Changes">
              <P>
                We reserve the right to change subscription prices at any time. Price changes for monthly subscriptions will take effect at the start of your next billing cycle. Lifetime plan purchases are not affected by future price changes. We will provide reasonable notice of price changes.
              </P>
            </SubSection>
          </Section>

          <Section title="5. Device Restrictions">
            <P>
              Pro subscriptions are limited to use on one device at a time. When you sign in to the OpenStudio application, your device is linked to your account. If you attempt to use your account on a different device, access to Pro features will be restricted on the new device until the previous device is unlinked.
            </P>
            <P>
              You may unlink a device at any time from your account settings on the Website. If you get a new device, simply unlink the old one and sign in on the new device. Sharing your account credentials with others to allow simultaneous use on multiple devices is prohibited.
            </P>
          </Section>

          <Section title="6. Acceptable Use">
            <P>You agree not to:</P>
            <BulletList items={[
              "Share, transfer, or sell your account to another person",
              "Circumvent device restrictions, trial limitations, or any technical measures we implement",
              "Use the Application for any unlawful purpose or in violation of any applicable laws",
              "Reverse engineer, decompile, or disassemble the Application",
              "Attempt to gain unauthorized access to our systems or servers",
              "Use automated tools or scripts to interact with our services in an unauthorized manner",
              "Interfere with or disrupt the integrity of our services",
            ]} />
          </Section>

          <Section title="7. Intellectual Property">
            <P>
              OpenStudio, including its code, design, branding, and documentation, is the intellectual property of Rune. Your subscription grants you a limited, non-exclusive, non-transferable license to use the Application for personal or professional use. This license does not grant you ownership of the Application or any of its components.
            </P>
            <P>
              Content you create using OpenStudio (your screen recordings, edits, and exports) belongs entirely to you. We claim no ownership or rights over your content.
            </P>
          </Section>

          <Section title="8. Termination">
            <P>
              You may terminate your account at any time by cancelling your subscription and contacting us to request account deletion. We reserve the right to suspend or terminate your account at our discretion if we reasonably believe you have violated these Terms, including but not limited to trial abuse, account sharing, or circumvention of device restrictions.
            </P>
            <P>
              Upon termination, your access to Pro features will cease. Any data associated with your account may be deleted in accordance with our Privacy Policy.
            </P>
          </Section>

          <Section title="9. Disclaimers">
            <P>
              OpenStudio is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </P>
            <P>
              We do not warrant that the Application will be uninterrupted, error-free, or free of harmful components. We are not responsible for any loss of data, recordings, or other content that may occur through the use of the Application.
            </P>
          </Section>

          <Section title="10. Limitation of Liability">
            <P>
              To the maximum extent permitted by applicable law, Rune and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with your use of OpenStudio, regardless of the theory of liability.
            </P>
            <P>
              Our total liability to you for any claims arising from or related to these Terms or your use of OpenStudio shall not exceed the amount you have paid to us in the 12 months preceding the claim.
            </P>
          </Section>

          <Section title="11. Refund Policy">
            <P>
              Please refer to our <ChakraLink as={NextLink} href="/openstudio/refund" color="#1a84fe" _hover={{ textDecoration: "underline" }}>Refund Policy</ChakraLink> for information about refunds and cancellations.
            </P>
          </Section>

          <Section title="12. Changes to Terms">
            <P>
              We reserve the right to modify these Terms at any time. We will notify users of material changes by updating the &ldquo;Last updated&rdquo; date on this page. Your continued use of OpenStudio after changes are posted constitutes your acceptance of the revised Terms.
            </P>
          </Section>

          <Section title="13. Governing Law">
            <P>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the operator of OpenStudio resides, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts in that jurisdiction. Nothing in these Terms limits any consumer protection rights you may have under the laws of your country of residence.
            </P>
          </Section>

          <Section title="14. Contact">
            <P>
              If you have any questions about these Terms, please contact us at:
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
              <ChakraLink as={NextLink} href="/openstudio/privacy" fontSize="14px" color="#9ca3af" _hover={{ color: "#111827" }}>
                Privacy
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
