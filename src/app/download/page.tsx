"use client";

import {
    Box,
    Heading,
    Text,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { colors } from "@/theme/colors";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PixelBlast from "@/components/PixelBlast";

export default function DownloadPage() {
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
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box position="absolute" inset={0} overflow="hidden" opacity={0.5}>
                        <PixelBlast
                            pixelSize={4}
                            color={c.pixelBlast}
                            enableRipples={false}
                            speed={0}
                            edgeFade={0.5}
                            transparent={true}
                            timeOffset={353}
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
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        h="200px"
                        bg={`linear-gradient(to top, transparent, ${c.bg})`}
                        zIndex={1}
                        pointerEvents="none"
                    />

                    {/* Mask for heading */}
                    <Box
                        position="absolute"
                        top="38%"
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
                        top="52%"
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
                            Download
                        </Heading>

                        <Text
                letterSpacing="-0.03em"
                            fontSize={{ base: "lg", md: "1xl", lg: "3xl" }}
                            color={c.text.secondary}
                            fontWeight={500}
                            lineHeight={1.5}
                            maxW="550px"
                        >
                            Available everywhere. Pick your OS and start building.
                        </Text>
                        <VStack spacing={3} mt={4} w="full" maxW="300px">
                            <Link href="/get" style={{ width: "100%" }}>
                                <Box
                                    as="button"
                                    w="70%"
                                    px={2}
                                    py={3}
                                    bg={c.btn.bg}
                                    color={c.btn.text}
                                    fontWeight={600}
                                    fontSize="md"
                                    borderRadius="lg"
                                    transition="all 0.2s"
                                    _hover={{ bg: c.btn.hover }}
                                >
                                    Download for macOS
                                </Box>
                            </Link>
                        </VStack>
                    </VStack>
                </Box>

                <Footer />
            </Box>
        </Box >
    );
}
