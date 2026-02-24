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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkVeil from "@/components/DarkVeil";

/* ------------------------------------------------------------------ */
/*  Download Page                                                      */
/* ------------------------------------------------------------------ */

export default function DownloadPage() {

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
                            as="h1"
                            fontSize={{ base: "5xl", lg: "7xl" }}
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
                            Download Rune
                        </Heading>

                        <Text
                            fontSize={{ base: "md", md: "xl" }}
                            color="gray.400"
                            lineHeight={1.5}
                            maxW="500px"
                            mx="auto"
                        >
                            Available everywhere. Pick your OS and start building.
                        </Text>

                    </VStack>
                </Box>

                {/* Spacer */}
                <Box pb={{ base: 16, md: 28 }} />

                <Box mt="auto">
                    <Footer />
                </Box>
            </Box>
        </Box >
    );
}