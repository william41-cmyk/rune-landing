"use client";

import { Box, useColorMode } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import FeaturesCarouselSection from "@/components/FeaturesCarouselSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function CodePage() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  return (
    <Box as="main" minH="100vh" bg={c.bg} overflowX="hidden">
      <Box
        maxW="1200px"
        mx="auto"
        position="relative"
        borderLeft="1px dashed"
        borderRight="1px dashed"
        borderColor={c.border.subtle}
      >
        <Navbar />
        <HeroSection />
        <VideoSection />
        <FeaturesCarouselSection />
        <CTASection />
        <Footer />
      </Box>
    </Box>
  );
}
