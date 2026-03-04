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
    useColorMode,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { colors } from "@/theme/colors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";

export default function RuneCoinPage() {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";
    const c = colors(isDark);

    return (
        <Box minH="100vh" bg={c.bg} overflowX="hidden">
            <Box
                maxW="1200px"
                mx="auto"
                position="relative"
                borderLeft="1px dashed"
                borderRight="1px dashed"
                borderColor={c.border.subtle}
                display="flex"
                flexDirection="column"
                minH="100vh"
            >
                <Navbar />
                <Box
                    position="relative"
                    overflow="hidden"
                    pt={{ base: "120px", md: "180px" }}
                    pb={{ base: 28, md: 40 }}
                >
                    <Box position="absolute" inset={0} overflow="hidden" opacity={0.5}>
                        <PixelBlast
                            pixelSize={4}
                            color={c.pixelBlast}
                            enableRipples={false}
                            speed={0}
                            edgeFade={0.5}
                            transparent={true}
                        />
                    </Box>

                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        h="200px"
                        bg={`linear-gradient(to bottom, transparent, ${c.bg})`}
                        zIndex={1}
                        pointerEvents="none"
                    />

                    {/* Mask for heading */}
                    <Box
                        position="absolute"
                        top="40%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="400px"
                        h="60px"
                        borderRadius="20px"
                        bg={c.bg}
                        boxShadow={`0 0 60px 60px ${c.bg}`}
                        pointerEvents="none"
                        zIndex={1}
                    />
                    {/* Mask for subtitle */}
                    <Box
                        position="absolute"
                        top="62%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="520px"
                        h="50px"
                        borderRadius="16px"
                        bg={c.bg}
                        boxShadow={`0 0 50px 50px ${c.bg}`}
                        pointerEvents="none"
                        zIndex={1}
                    />

                    <VStack
                        position="relative"
                        zIndex={2}
                        spacing={5}
                        mx="auto"
                        px={{ base: 5, md: 8 }}
                        textAlign="center"
                    >
                        <Heading
                            as="h2"
                            fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
                            fontWeight={500}
                            lineHeight={1.05}
                            letterSpacing="-0.03em"
                            maxW="700px"
                            sx={{
                                background: c.text.primary,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            $RUNE
                        </Heading>

                        <Text
                letterSpacing="-0.03em"
                            fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                            color={c.text.secondary}
                            fontWeight={500}
                            lineHeight={1.5}
                            maxW="550px"
                        >
                            The official Rune support token.
                            Join the community to support Rune's future development.
                        </Text>
                    </VStack>
                </Box>
                <Box
                    position="relative"
                    zIndex={3}
                    maxW="1100px"
                    mx="auto"
                    px={{ base: 5, md: 8 }}
                    pt={{ base: 4, md: 6 }}
                    pb={{ base: 16, md: 28 }}
                    w="100%"
                >
                    <VStack spacing={{ base: 8, md: 10 }} textAlign="center">
                        <Box
                            as="a"
                            href="https://pump.fun/coin/9fAT1fVVEKMEL6rUeYxSYU8ZjQ5dSiTzAZYTdiPvpump"
                            target="_blank"
                            rel="noopener noreferrer"
                            cursor="pointer"
                        >
                            <Box position="relative" display="inline-flex">
                                <Flex
                                    position="relative"
                                    w={{ base: "180px", md: "220px" }}
                                    h={{ base: "180px", md: "220px" }}
                                    borderRadius="full"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        background: isDark
                                            ? `
                                                radial-gradient(circle at 35% 35%, ${c.overlay.medium} 0%, transparent 60%),
                                                linear-gradient(145deg, #1a1a1a 0%, #141414 100%)
                                            `
                                            : `
                                                radial-gradient(circle at 35% 35%, ${c.overlay.medium} 0%, transparent 60%),
                                                linear-gradient(145deg, #ffffff 0%, #f5f4f2 100%)
                                            `,
                                        boxShadow: isDark
                                            ? `
                                                0 0 0 2px ${c.border.faint},
                                                0 0 0 6px ${c.overlay.subtle},
                                                0 0 0 8px ${c.overlay.medium},
                                                0 8px 32px rgba(0,0,0,0.3),
                                                0 0 60px rgba(20, 141, 255, 0.06)
                                            `
                                            : `
                                                0 0 0 2px ${c.border.faint},
                                                0 0 0 6px ${c.overlay.subtle},
                                                0 0 0 8px ${c.overlay.medium},
                                                0 8px 32px rgba(0,0,0,0.06),
                                                0 0 60px rgba(20, 141, 255, 0.06)
                                            `,
                                    }}
                                >
                                    <Flex
                                        w={{ base: "150px", md: "184px" }}
                                        h={{ base: "150px", md: "184px" }}
                                        borderRadius="full"
                                        alignItems="center"
                                        justifyContent="center"
                                        border="1px solid"
                                        borderColor={c.border.faint}
                                        bg={c.overlay.subtle}
                                    >
                                        <Image
                                            src="/rune-logo.webp"
                                            alt="Rune"
                                            h={{ base: "56px", md: "64px" }}
                                            w="auto"
                                            filter={isDark ? "invert(1) brightness(0.9)" : "brightness(0.9)"}
                                        />
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box>
                        <HStack
                            spacing={2}
                            color={c.text.subtle}
                            transition="all 0.2s"
                        >
                            <Text fontSize="sm" fontWeight={500} letterSpacing="-0.03em">
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
