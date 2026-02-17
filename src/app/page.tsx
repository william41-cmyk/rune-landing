import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import FeaturesCarouselSection from "@/components/FeaturesCarouselSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Box as="main" minH="100vh" bg="#171717" overflowX="hidden">
      {/* Bordered container â€” everything lives inside the side lines */}
      <Box
        maxW="1200px"
        mx="auto"
        position="relative"
        borderLeft="1px dashed"
        borderRight="1px dashed"
        borderColor="rgba(255,255,255,0.12)"
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