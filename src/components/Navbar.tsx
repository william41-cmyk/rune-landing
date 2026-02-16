"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Link as ChakraLink, Image
} from "@chakra-ui/react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineCommandLine } from "react-icons/hi2";


export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      w="100%"
      zIndex={1000}
      backdropFilter={scrolled ? "blur(20px)" : "none"}
      borderBottom="1px dashed"
      borderColor={scrolled ? "rgba(255,255,255,0.08)" : "transparent"}
      transition="all 0.3s ease"
      sx={{ WebkitBackdropFilter: scrolled ? "blur(20px)" : "none" }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 5, md: 8 }}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <HStack spacing={2.5} cursor="pointer" >
          <Image src="/rune-logo.webp" alt="Rune" h="32px" w="auto" />
        </HStack>

        {/* CTA */}
        <HStack spacing={4}>
          <ChakraLink
            href="#"
            fontSize="md"
            fontWeight={500}
            color="gray.400"
            _hover={{ color: "gray.50", textDecoration: "none" }}
            transition="all 0.2s"
          >
            Community
          </ChakraLink>
          <ChakraLink
            href="#"
            fontSize="md"
            fontWeight={500}
            color="gray.400"
            _hover={{ color: "gray.50", textDecoration: "none" }}
            transition="all 0.2s"
          >
            Source
          </ChakraLink>
          <Link href="/download" passHref>
            <Button
              size="sm"
              bg="#e6e6e6"
              color="#171717"
              fontWeight={500}
              fontSize="sm"
              borderRadius="full"
              px={4}
              _hover={{ bg: "#d4d4d4" }}
              _active={{ bg: "#c2c2c2" }}
              transition="all 0.2s"
            >
              Download
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}