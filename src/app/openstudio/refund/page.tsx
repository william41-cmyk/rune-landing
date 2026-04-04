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

export default function RefundPolicyPage() {
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
            Refund Policy
          </Text>
          <Text fontSize="15px" color="#6b7280">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Text>
        </VStack>

        <VStack align="start" spacing={10}>
          <Section title="General Policy">
            <P>
              All purchases of OpenStudio Pro subscriptions and lifetime plans are final. We generally do not offer refunds, as we provide a free plan and a 3-day free trial so that users can evaluate the Application before committing to a paid plan.
            </P>
            <P>
              We encourage all users to take full advantage of the free plan and trial period to ensure OpenStudio meets their needs before purchasing.
            </P>
          </Section>

          <Section title="Free Trial">
            <P>
              New users are eligible for a one-time 3-day free trial of the Pro plan at no cost. During the trial period, you have full access to all Pro features including video export. If you cancel before the trial ends, you will not be charged.
            </P>
            <P>
              If you do not cancel before the trial expires, your subscription will automatically convert to a paid monthly subscription and you will be charged. This charge is non-refundable as the trial period provided sufficient time to evaluate the product.
            </P>
          </Section>

          <Section title="Monthly Subscriptions">
            <P>
              Monthly subscription charges are non-refundable. You may cancel your subscription at any time, and you will retain access to Pro features until the end of your current billing period. No partial refunds are issued for unused time within a billing period.
            </P>
            <P>
              To avoid future charges, cancel your subscription before your next renewal date. You can manage your subscription through the Lemon Squeezy billing portal, accessible from your account page.
            </P>
          </Section>

          <Section title="Lifetime Plan">
            <P>
              Lifetime plan purchases are non-refundable. The lifetime plan grants permanent access to all current and future Pro features with a single payment. Given the significant discount compared to the monthly subscription, this purchase is considered final.
            </P>
          </Section>

          <Section title="Exceptions">
            <P>
              While our general policy is no refunds, we may consider exceptions on a case-by-case basis in the following circumstances:
            </P>
            <BulletList items={[
              "You were charged after cancelling your subscription due to a technical error on our end",
              "You experienced a critical, reproducible bug that prevented you from using core Pro features and we were unable to resolve it within a reasonable timeframe",
              "You were charged multiple times for the same billing period due to a system error",
            ]} />
            <P>
              To request an exception, please contact us within 7 days of the charge with a description of the issue. Requests made after 7 days will not be considered.
            </P>
          </Section>

          <Section title="Statutory Rights">
            <P>
              Nothing in this Refund Policy affects your statutory rights as a consumer. If you are a consumer in the European Union, United Kingdom, Australia, or any other jurisdiction that provides mandatory consumer protection rights, those rights apply regardless of this policy. If applicable law entitles you to a refund, we will honour that entitlement.
            </P>
          </Section>

          <Section title="How to Cancel">
            <P>
              You can cancel your monthly subscription at any time through the following methods:
            </P>
            <BulletList items={[
              "Visit your account page at openstudio.gl and click \"Manage subscription\"",
              "Use the Lemon Squeezy billing portal directly",
              "Contact us by email and we will cancel it for you",
            ]} />
            <P>
              After cancellation, you will continue to have access to Pro features until the end of your current billing period.
            </P>
          </Section>

          <Section title="Contact Us">
            <P>
              If you have questions about this Refund Policy or need to request an exception, please contact us at:
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
              <ChakraLink as={NextLink} href="/openstudio/terms" fontSize="14px" color="#9ca3af" _hover={{ color: "#111827" }}>
                Terms
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
