"use client";

import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
    Image,
} from "@chakra-ui/react";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

/* ------------------------------------------------------------------ */
/*  $RUNE Coin Page                                                    */
/* ------------------------------------------------------------------ */

export default function RuneCoinPage() {
    return (
        <Box minH="100vh" bg="#171717" overflowX="hidden">
            <Box
                maxW="1200px"
                mx="auto"
                position="relative"
                borderLeft="1px dashed"
                borderRight="1px dashed"
                borderColor="rgba(255,255,255,0.08)"
                display="flex"
                flexDirection="column"
                minH="100vh"
            >
                <Navbar />

                {/* Hero area with shader bg */}
                <Box
                    position="relative"
                    pt={{ base: "120px", md: "140px" }}
                    pb={{ base: 10, md: 16 }}
                >
                    <Box position="absolute" inset={0} overflow="hidden" opacity={0.5}>
                        <DarkVeil
                            hueShift={25}
                            noiseIntensity={0.03}
                            scanlineIntensity={0}
                            speed={0.15}
                            scanlineFrequency={0}
                            warpAmount={0.2}
                            resolutionScale={1}
                        />
                    </Box>

                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        h="200px"
                        bg="linear-gradient(to bottom, transparent, #171717)"
                        zIndex={1}
                        pointerEvents="none"
                    />

                    <VStack
                        position="relative"
                        zIndex={2}
                        spacing={5}
                        maxW="700px"
                        mx="auto"
                        px={{ base: 5, md: 8 }}
                        textAlign="center"
                    >
                        <Link href="/">
                            <HStack
                                spacing={2}
                                color="gray.500"
                                cursor="pointer"
                                transition="all 0.2s"
                                _hover={{ color: "gray.300" }}
                                mb={4}
                                justify="center"
                            >
                                <Icon as={FiArrowLeft} boxSize={3.5} />
                                <Text fontSize="sm" fontWeight={500}>Back to home</Text>
                            </HStack>
                        </Link>

                        <Heading
                            fontSize={{ base: "5xl", md: "7xl" }}
                            fontWeight={700}
                            lineHeight={1.1}
                            letterSpacing="-0.03em"
                            sx={{
                                background: "#e6e6e6",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            $RUNE
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            color="gray.400"
                            lineHeight={1.6}
                            maxW="450px"
                            mx="auto"
                        >
                            The official Rune support token.
                            Join the community to support Rune's future development.
                        </Text>
                    </VStack>
                </Box>

                {/* Coin button section */}
                <Box
                    position="relative"
                    zIndex={2}
                    maxW="1100px"
                    mx="auto"
                    px={{ base: 5, md: 8 }}
                    pt={{ base: 4, md: 6 }}
                    pb={{ base: 16, md: 28 }}
                    w="100%"
                >
                    <VStack spacing={{ base: 8, md: 10 }} textAlign="center">
                        {/* Coin button */}
                        <Box
                            as="a"
                            href="https://pump.fun/coin/9fAT1fVVEKMEL6rUeYxSYU8ZjQ5dSiTzAZYTdiPvpump"
                            target="_blank"
                            rel="noopener noreferrer"
                            cursor="pointer"
                        >
                            <Box position="relative" display="inline-flex">
                                {/* Coin container */}
                                <Flex
                                    position="relative"
                                    w={{ base: "180px", md: "220px" }}
                                    h={{ base: "180px", md: "220px" }}
                                    borderRadius="full"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        /* Triple ring border for coin effect */
                                        background: `
                                                radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06) 0%, transparent 60%),
                                                linear-gradient(145deg, #1c1c1c 0%, #161616 100%)
                                            `,
                                        boxShadow: `
                                                0 0 0 2px rgba(255,255,255,0.08),
                                                0 0 0 6px rgba(255,255,255,0.03),
                                                0 0 0 8px rgba(255,255,255,0.06),
                                                0 8px 32px rgba(0,0,0,0.5),
                                                0 0 60px rgba(20, 141, 255, 0.06)
                                            `,
                                    }}
                                >
                                    {/* Inner ring */}
                                    <Flex
                                        w={{ base: "150px", md: "184px" }}
                                        h={{ base: "150px", md: "184px" }}
                                        borderRadius="full"
                                        alignItems="center"
                                        justifyContent="center"
                                        border="1px solid"
                                        borderColor="rgba(255,255,255,0.06)"
                                        bg="rgba(255,255,255,0.02)"
                                    >
                                        {/* Logo */}
                                        <Image
                                            src="/rune-logo.webp"
                                            alt="Rune"
                                            h={{ base: "56px", md: "64px" }}
                                            w="auto"
                                            filter="brightness(0.9)"
                                        />
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box>

                        {/* Label under coin */}
                        <HStack
                            spacing={2}
                            color="gray.500"
                            transition="all 0.2s"
                        >
                            <Text fontSize="sm" fontWeight={500}>
                                Get $RUNE
                            </Text>
                            <Icon as={FiExternalLink} boxSize={3.5} />
                        </HStack>
                    </VStack>
                </Box>

                <Box mt="auto">
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
