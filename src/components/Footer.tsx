"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { colors } from "@/theme/colors";

const links = [
  { label: "X", href: "https://x.com/runedotgl" },
  { label: "Documentation", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
];

export default function Footer() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box
      as="footer"
      bg={c.bg}
      position="relative"
      zIndex={1}
      borderTop="1px dashed"
      borderColor={c.border.subtle}
      py={8}
      px={{ base: 5, md: 8 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={6}
      >
        <HStack spacing={2}>
          <Image src="/rune-icon.svg" alt="Rune icon" h="28px" w="auto" filter={isDark ? "none" : "invert(1)"} />
        </HStack>
        <HStack spacing={6}>
          {links.map((link) => (
            <ChakraLink
              key={link.label}
              href={link.href}
              display="flex"
              alignItems="center"
              gap={1.5}
              fontSize="sm"
              color={c.text.subtle}
              _hover={{
                color: c.text.primary,
                textDecoration: "none",
              }}
              transition="all 0.2s"
            >
              <Text letterSpacing="-0.03em">{link.label}</Text>
            </ChakraLink>
          ))}
          <Link href="/$rune">
            <Text
                letterSpacing="-0.03em"
              fontSize="sm"
              fontWeight={500}
              color={c.text.subtle}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ color: c.text.primary }}
            >
              Token
            </Text>
          </Link>
        </HStack>
        <HStack spacing={4} align="center">
          <ThemeToggle />
          <Text
                letterSpacing="-0.03em"
            fontSize="xs"
            fontWeight={500}
            color={c.text.subtle}
            whiteSpace="nowrap"
          >
            &copy; {new Date().getFullYear()} Rune.
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
