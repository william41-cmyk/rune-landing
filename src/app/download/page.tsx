"use client";

import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Icon,
} from "@chakra-ui/react";
import {
    FiArrowLeft,
} from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import DarkVeil from "@/components/DarkVeil";

/* ------------------------------------------------------------------ */
/*  Countdown target: 23 Feb 2026 00:00:00 UTC                        */
/* ------------------------------------------------------------------ */

const TARGET = new Date("2026-02-23T00:00:00Z").getTime();

function useCountdown() {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const diff = Math.max(0, TARGET - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, ended: diff === 0 };
}

/* ------------------------------------------------------------------ */
/*  Download Page                                                      */
/* ------------------------------------------------------------------ */

export default function DownloadPage() {
    const { days, hours, minutes, seconds, ended } = useCountdown();

    const pad = (n: number) => String(n).padStart(2, "0");

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
                    overflow="hidden"
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
                        <AnimatedSection>
                            <Link href="/" passHref>
                                <HStack
                                    as="a"
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
                        </AnimatedSection>

                        <AnimatedSection delay={0.05}>
                            <Heading
                                fontSize={{ base: "5xl", md: "7xl" }}
                                fontWeight={700}
                                lineHeight={1.1}
                                letterSpacing="-0.03em"
                                sx={{
                                    background: "linear-gradient(180deg, #f5f5f5 0%, #a3a3a3 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Download Rune
                            </Heading>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <Text
                                fontSize={{ base: "md", md: "xl" }}
                                color="gray.400"
                                lineHeight={1.5}
                                maxW="500px"
                                mx="auto"
                            >
                                Available everywhere. Pick your OS and start building.
                            </Text>
                        </AnimatedSection>

                    </VStack>
                </Box>

                {/* Countdown timer */}
                <Box
                    maxW="1100px"
                    mx="auto"
                    px={{ base: 5, md: 8 }}
                    pb={{ base: 16, md: 28 }}
                >
                    <AnimatedSection delay={0.2}>
                        <VStack spacing={{ base: 6, md: 8 }} textAlign="center">
                            {ended ? (
                                <Heading
                                    fontSize={{ base: "5xl", md: "8xl" }}
                                    fontWeight={700}
                                    letterSpacing="-0.03em"
                                    lineHeight={1.1}
                                    color="gray.50"
                                >
                                    Available now
                                </Heading>
                            ) : (
                                <>
                                    <Flex
                                        justify="center"
                                        align="baseline"
                                        gap={{ base: 3, md: 6 }}
                                        flexWrap="wrap"
                                    >
                                        {[
                                            { value: days, label: "Days" },
                                            { value: hours, label: "Hours" },
                                            { value: minutes, label: "Min" },
                                            { value: seconds, label: "Sec" },
                                        ].map((unit, i, arr) => (
                                            <HStack key={unit.label} spacing={{ base: 3, md: 6 }}>
                                                <VStack spacing={1}>
                                                    <Heading
                                                        fontSize={{ base: "5xl", md: "9xl" }}
                                                        fontWeight={700}
                                                        letterSpacing="-0.03em"
                                                        lineHeight={1}
                                                        fontFamily="mono"
                                                        color="gray.50"
                                                    >
                                                        {pad(unit.value)}
                                                    </Heading>
                                                    <Text
                                                        fontSize={{ base: "xs", md: "sm" }}
                                                        color="gray.500"
                                                        fontWeight={500}
                                                        textTransform="uppercase"
                                                        letterSpacing="0.1em"
                                                    >
                                                        {unit.label}
                                                    </Text>
                                                </VStack>
                                                {i < arr.length - 1 && (
                                                    <Heading
                                                        fontSize={{ base: "4xl", md: "7xl" }}
                                                        fontWeight={700}
                                                        color="gray.500"
                                                        lineHeight={1}
                                                        mt={{ base: "-8px", md: "-16px" }}
                                                    >
                                                        :
                                                    </Heading>
                                                )}
                                            </HStack>
                                        ))}
                                    </Flex>
                                </>
                            )}
                        </VStack>
                    </AnimatedSection>
                </Box>

                <Box mt="auto">
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}