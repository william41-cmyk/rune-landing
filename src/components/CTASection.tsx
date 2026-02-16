"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { FiDownload } from "react-icons/fi";
import { FiMonitor } from "react-icons/fi";
import { motion } from "framer-motion";


// Use generic icons since SiWindows/SiLinux may not be available in this version
const SiWindows = FiMonitor;
const SiLinux = FiMonitor;
import AnimatedSection from "./AnimatedSection";
import DarkVeil from "./DarkVeil";

const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionBox = motion.create(Box);

export default function CTASection() {
  return (
    <Box
      as="section"
      id="download"
      pt={{ base: "100px", md: "200px" }}
      pb={{ base: "180px", md: "360px" }}
      px={{ base: 5, md: 8 }}
      position="relative"
      overflow="hidden"
    >
      {/* Static DarkVeil background — different variant from hero */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        w="100%"
        h="100%"
        overflow="hidden"
        pointerEvents="none"
      >
        <DarkVeil
          hueShift={25}
          noiseIntensity={0.03}
          scanlineIntensity={0}
          speed={0}
          scanlineFrequency={0}
          warpAmount={0.3}
          resolutionScale={1.25}
        />
      </Box>

      {/* Top fade — blends from page bg into the shader */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="300px"
        bg="linear-gradient(to bottom, #171717, transparent)"
        zIndex={1}
        pointerEvents="none"
      />

      {/* Bottom fade — blends shader back into page bg / footer */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="300px"
        bg="linear-gradient(to top, #171717, transparent)"
        zIndex={1}
        pointerEvents="none"
      />

      <VStack maxW="700px" mx="auto" spacing={8} position="relative" zIndex={2} textAlign="center">
        <AnimatedSection>
          <Heading
            fontSize={{ base: "5xl", md: "9xl" }}
            fontWeight={700}
            letterSpacing="-0.02em"
            lineHeight={1.1}
            sx={{
              background: "linear-gradient(180deg, #f5f5f5 0%, #a3a3a3 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            It just works
          </Heading>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
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
          </MotionBox>
        </AnimatedSection>
      </VStack>
    </Box>
  );
}