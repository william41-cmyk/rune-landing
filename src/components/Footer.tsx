"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { FiGithub, FiBookOpen, FiFileText, FiTwitter } from "react-icons/fi";

const links = [
  { label: "GitHub", href: "#", icon: FiGithub },
  { label: "Documentation", href: "#", icon: FiBookOpen },
  { label: "Changelog", href: "#", icon: FiFileText },
];

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="#171717"
      position="relative"
      zIndex={1}
      borderTop="1px solid"
      borderColor="rgba(255,255,255,0.06)"
      py={8}
      px={{ base: 5, md: 8 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={6}
      >
        {/* Logo */}
        <HStack spacing={2}>
          <Flex
            w="24px"
            h="24px"
            bg="rgba(168, 85, 247, 0.15)"
            border="1px solid"
            borderColor="rgba(168, 85, 247, 0.3)"
            borderRadius="6px"
            align="center"
            justify="center"
          >
            <HiOutlineCommandLine size={13} color="#a855f7" />
          </Flex>
          <Text fontSize="md" fontWeight={600} color="gray.300">
            Rune
          </Text>
        </HStack>

        {/* Links */}
        <HStack spacing={6}>
          {links.map((link) => (
            <ChakraLink
              key={link.label}
              href={link.href}
              display="flex"
              alignItems="center"
              gap={1.5}
              fontSize="sm"
              color="gray.500"
              _hover={{ color: "gray.300", textDecoration: "none" }}
              transition="all 0.2s"
            >
              <Text display={{ base: "none", sm: "block" }}>{link.label}</Text>
            </ChakraLink>
          ))}
        </HStack>

        {/* Copyright */}
        <Text fontSize="xs" color="gray.600">
          &copy; {new Date().getFullYear()} Rune. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
}
