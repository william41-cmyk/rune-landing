"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import DarkVeil from "./DarkVeil";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Box as="section" position="relative" h="42vh" minH="380px" overflow="hidden" id="hero">
      <Box position="absolute" inset={0} overflow="hidden">
        <DarkVeil
          hueShift={25}
          noiseIntensity={0.05}
          scanlineIntensity={0}
          speed={0.25}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1.35}
        />
      </Box>
      <Flex
        position="relative"
        zIndex={1}
        direction="column"
        align="center"
        justify="center"
        h="100%"
        pt="80px"
        pb="0"
        px={{ base: 5, md: 8 }}
      >
        <VStack spacing={6} maxW="760px" textAlign="center" mb={0}>
          <Heading
            as="h1"
            fontSize={{ base: "6xl", md: "7xl", lg: "8xl" }}
            fontWeight={700}
            lineHeight={1.05}
            letterSpacing="-0.03em"
            sx={{
              background: "#e6e6e6",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Agentic Engineering, Simplified
          </Heading>
          <Box>
            <VStack spacing={3}>
              <Link href="/download" passHref>
                <Button
                  bg="#e6e6e6"
                  color="#171717"
                  fontWeight={500}
                  fontSize="md"
                  borderRadius="full"
                  px={5}
                  h="40px"
                  leftIcon={<FiDownload size={14} />}
                  _hover={{ bg: "#d4d4d4" }}
                  _active={{ bg: "#c2c2c2" }}
                  transition="all 0.2s"
                >
                  Download Now
                </Button>
              </Link>
              <Text
                fontSize="xs"
                fontWeight={500}
                color="gray.400"
              >
                macOS, Windows & Linux
              </Text>
            </VStack>
          </Box>
        </VStack>

      </Flex>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="120px"
        bg="linear-gradient(to bottom, transparent, #171717)"
        zIndex={2}
        pointerEvents="none"
      />
    </Box>
  );
}
