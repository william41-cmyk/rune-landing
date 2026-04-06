"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Image,
  Link as ChakraLink,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import {
  FiChevronRight,
  FiChevronDown,
  FiDownload,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";
import PillIcon from "./PillIcon";
import { HiUserGroup } from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import RuneLogo from "./RuneLogo";
import { colors } from "@/theme/colors";

const products = [
  { name: "Rune Code", description: "Code the right way", href: "/code", img: "/rune-logo.webp" },
  { name: "Rune Grab", description: "Grab UI context for AI", href: "/grab", img: "/rune-grab-logo.webp" },
  { name: "Hugr", description: "Multi-agent workflows", href: "/hugr", img: "/hugr.webp" },
  { name: "OpenStudio", description: "Screen recordings", href: "https://openstudio.gl", img: "/openstudio_2.png" },
];

const downloads = [
  { name: "Rune App", href: "/download" },
  { name: "Rune Grab", href: "/grab" },
];

const socials = [
  { name: "Twitter", href: "https://x.com/runedotgl", icon: FaXTwitter },
  { name: "Community", href: "https://x.com/i/communities/2024097721632608293", icon: HiUserGroup },
  { name: "Discord", href: "https://discord.gg/MrD6dW4u9D", icon: FaDiscord },
  { name: "Github", href: "https://github.com/orgs/RuneLtd/repositories", icon: FaGithub },
  { name: "Rune Token", href: "https://pump.fun/coin/9fAT1fVVEKMEL6rUeYxSYU8ZjQ5dSiTzAZYTdiPvpump", icon: PillIcon },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const c = colors(isDark);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const handleMouseEnter = () => {
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    setProductsOpen(false);
  };

  const handleSocialEnter = () => {
    setSocialOpen(true);
  };

  const handleSocialLeave = () => {
    setSocialOpen(false);
  };

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
      borderColor={
        scrolled
          ? isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"
          : "transparent"
      }
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
        <Link href="/">
          <HStack spacing={2.5} cursor="pointer">
            <Image src="/rune-icon.svg" alt="Rune icon" h="28px" w="auto" filter={isDark ? "none" : "invert(1)"} />
            <Text fontSize="2xl" fontWeight={700} color={c.text.primary} letterSpacing="-0.04em" lineHeight={1}>
              RUNE
            </Text>
          </HStack>
        </Link>
        {/* Mobile hamburger */}
        <Box display={{ base: "flex", md: "none" }} alignItems="center" gap={3}>
          <Link href="/download" passHref>
            <Button
              size="sm"
              bg={c.btn.bg}
              color={c.btn.text}
              fontWeight={500}
              fontSize="sm"
              borderRadius="full"
              px={4}
              _hover={{ bg: c.btn.hover }}
              _active={{ bg: c.btn.active }}
              transition="all 0.2s"
              leftIcon={<FiDownload size={12} />}
            >
              Download
            </Button>
          </Link>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            onClick={() => { setMobileOpen(!mobileOpen); setMobileSection(null); }}
          >
            <Icon as={mobileOpen ? FiX : FiMenu} boxSize={5} color={c.text.primary} />
          </Box>
        </Box>

        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          {/* Products Dropdown */}
          <Box
            position="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <HStack
              spacing={1}
              cursor="pointer"
              role="button"
              aria-expanded={productsOpen}
            >
              <Text
                letterSpacing="-0.03em"
                fontSize="md"
                fontWeight={500}
                color={productsOpen ? (c.text.primary) : (c.text.muted)}
                transition="all 0.2s"
                _hover={{ color: c.text.primary }}
                userSelect="none"
              >
                Products
              </Text>
              <Icon
                as={FiChevronRight}
                boxSize={3.5}
                color={productsOpen ? (c.text.primary) : (c.text.subtle)}
                transition="all 0.2s"
                transform={productsOpen ? "rotate(90deg)" : "rotate(0deg)"}
              />
            </HStack>

            {/* Invisible bridge between trigger and dropdown */}
            {productsOpen && (
              <Box
                position="absolute"
                top="100%"
                left="-20px"
                right="-20px"
                h="16px"
              />
            )}

            {productsOpen && (
                <Box
                  position="absolute"
                  top="calc(100% + 12px)"
                  left="50%"
                  transform="translateX(-50%)"
                  minW="220px"
                  py={1}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={c.border.subtle}
                  bg={c.bg}
                  backdropFilter="blur(20px)"
                  sx={{ WebkitBackdropFilter: "blur(20px)" }}
                  boxShadow={c.shadow.dropdown}
                  zIndex={1001}
                >
                  {products.map((product) => {
                    const isExternal = product.href.startsWith("http");
                    const linkProps = isExternal
                      ? { as: "a" as const, href: product.href, target: "_blank", rel: "noopener noreferrer" }
                      : {};
                    const Wrapper = isExternal ? ChakraLink : Link;
                    return (
                      <Wrapper key={product.href} href={product.href} onClick={() => setProductsOpen(false)} {...(isExternal ? { isExternal: true, _hover: { textDecoration: "none" } } : {})}>
                        <HStack
                          spacing={3}
                          px={4}
                          py={1.5}
                          cursor="pointer"
                          transition="all 0.15s"
                          role="group"
                        >
                          {product.img ? (
                            <Image
                              src={product.img}
                              alt={product.name}
                              w="28px"
                              h="28px"
                              borderRadius="6px"
                              objectFit="contain"
                              flexShrink={0}
                              bg="white"
                            />
                          ) : (
                            <Flex
                              w="28px"
                              h="28px"
                              borderRadius="6px"
                              bg={c.overlay.hover}
                              align="center"
                              justify="center"
                              flexShrink={0}
                            >
                              <Text fontSize="sm" fontWeight={700} color={c.text.muted} userSelect="none">?</Text>
                            </Flex>
                          )}
                          <Box>
                            <Text
                  letterSpacing="-0.03em"
                              fontSize="sm"
                              fontWeight={500}
                              color={c.text.inactive}
                              lineHeight={1.3}
                              transition="color 0.15s"
                              _groupHover={{ color: c.text.primary }}
                            >
                              {product.name}
                            </Text>
                            <Text
                  letterSpacing="-0.03em"
                              fontSize="xs"
                              color={c.text.faint}
                              lineHeight={1.3}
                              transition="color 0.15s"
                              _groupHover={{ color: c.text.muted }}
                            >
                              {product.description}
                            </Text>
                          </Box>
                        </HStack>
                      </Wrapper>
                    );
                  })}
                </Box>
              )}
          </Box>

          {/* Social Dropdown */}
          <Box
            position="relative"
            onMouseEnter={handleSocialEnter}
            onMouseLeave={handleSocialLeave}
          >
            <HStack
              spacing={1}
              cursor="pointer"
              role="button"
              aria-expanded={socialOpen}
            >
              <Text
                letterSpacing="-0.03em"
                fontSize="md"
                fontWeight={500}
                color={socialOpen ? c.text.primary : c.text.muted}
                transition="all 0.2s"
                _hover={{ color: c.text.primary }}
                userSelect="none"
              >
                Social
              </Text>
              <Icon
                as={FiChevronRight}
                boxSize={3.5}
                color={socialOpen ? c.text.primary : c.text.subtle}
                transition="all 0.2s"
                transform={socialOpen ? "rotate(90deg)" : "rotate(0deg)"}
              />
            </HStack>

            {/* Invisible bridge */}
            {socialOpen && (
              <Box
                position="absolute"
                top="100%"
                left="-20px"
                right="-20px"
                h="16px"
              />
            )}

            {socialOpen && (
                <Box
                  position="absolute"
                  top="calc(100% + 12px)"
                  left="50%"
                  transform="translateX(-50%)"
                  minW="160px"
                  py={1}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={c.border.subtle}
                  bg={c.bg}
                  backdropFilter="blur(20px)"
                  sx={{ WebkitBackdropFilter: "blur(20px)" }}
                  boxShadow={c.shadow.dropdown}
                  zIndex={1001}
                >
                  {socials.map((social) => (
                    <ChakraLink
                      key={social.name}
                      href={social.href}
                      isExternal
                      _hover={{ textDecoration: "none" }}
                      onClick={() => setSocialOpen(false)}
                    >
                      <HStack
                        spacing={2.5}
                        px={4}
                        py={1.5}
                        cursor="pointer"
                        transition="color 0.15s"
                        color={c.text.inactive}
                        _hover={{ color: c.text.primary }}
                      >
                        <Icon as={social.icon} boxSize={3.5} />
                        <Text fontSize="sm" fontWeight={500} letterSpacing="-0.03em">
                          {social.name}
                        </Text>
                      </HStack>
                    </ChakraLink>
                  ))}
                </Box>
              )}
          </Box>
          {/* Split Download Button */}
          <Box position="relative">
            <HStack spacing={0}>
              <Link href="/download" passHref>
                <Button
                  size="sm"
                  bg={c.btn.bg}
                  color={c.btn.text}
                  fontWeight={500}
                  fontSize="sm"
                  borderRadius="full"
                  borderRightRadius={0}
                  px={4}
                  _hover={{ bg: c.btn.hover }}
                  _active={{ bg: c.btn.active }}
                  transition="all 0.2s"
                  leftIcon={<FiDownload size={12} />}
                >
                  Download
                </Button>
              </Link>
              <Box
                w="1px"
                h="32px"
                bg={c.btn.text}
                opacity={0.2}
              />
              <Box
                as="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="32px"
                px={2}
                bg={c.btn.bg}
                color={c.btn.text}
                borderRadius="full"
                borderLeftRadius={0}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ bg: c.btn.hover }}
                _active={{ bg: c.btn.active }}
                onMouseEnter={() => setDownloadOpen(true)}
                onMouseLeave={() => setDownloadOpen(false)}
              >
                <Icon as={FiChevronDown} boxSize={3.5} />
              </Box>
            </HStack>

            {/* Download dropdown */}
            <Box
              position="absolute"
              top="100%"
              right={0}
              h="16px"
              left={0}
              onMouseEnter={() => setDownloadOpen(true)}
              onMouseLeave={() => setDownloadOpen(false)}
              display={downloadOpen ? "block" : "none"}
            />
            {downloadOpen && (
              <Box
                position="absolute"
                top="calc(100% + 12px)"
                right={0}
                minW="140px"
                py={1}
                borderRadius="2xl"
                border="1px solid"
                borderColor={c.border.subtle}
                bg={c.bg}
                backdropFilter="blur(20px)"
                sx={{ WebkitBackdropFilter: "blur(20px)" }}
                boxShadow={c.shadow.dropdown}
                zIndex={1001}
                onMouseEnter={() => setDownloadOpen(true)}
                onMouseLeave={() => setDownloadOpen(false)}
              >
                {downloads.map((dl) => (
                  <Link key={dl.href} href={dl.href} onClick={() => setDownloadOpen(false)}>
                    <Text
                letterSpacing="-0.03em"
                      px={4}
                      py={1.5}
                      fontSize="sm"
                      fontWeight={500}
                      color={c.text.inactive}
                      transition="color 0.15s"
                      _hover={{ color: c.text.primary }}
                    >
                      {dl.name}
                    </Text>
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        </HStack>
      </Flex>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          bg={c.bg}
          borderTop="1px solid"
          borderColor={c.border.subtle}
          px={5}
          py={4}
          maxH="calc(100vh - 60px)"
          overflowY="auto"
        >
          {/* Products */}
          <Box mb={1}>
            <Flex
              align="center"
              justify="space-between"
              py={2.5}
              cursor="pointer"
              onClick={() => setMobileSection(mobileSection === "products" ? null : "products")}
            >
              <Text fontSize="md" fontWeight={500} color={c.text.primary} letterSpacing="-0.03em">
                Products
              </Text>
              <Icon
                as={FiChevronRight}
                boxSize={3.5}
                color={c.text.subtle}
                transition="transform 0.2s"
                transform={mobileSection === "products" ? "rotate(90deg)" : "rotate(0deg)"}
              />
            </Flex>
            {mobileSection === "products" && (
              <Box pl={2} pb={2}>
                {products.map((product) => {
                  const isExternal = product.href.startsWith("http");
                  const Wrapper = isExternal ? ChakraLink : Link;
                  return (
                    <Wrapper key={product.href} href={product.href} onClick={() => setMobileOpen(false)} {...(isExternal ? { isExternal: true, _hover: { textDecoration: "none" } } : {})}>
                      <HStack spacing={3} py={2} px={2} borderRadius="8px" _hover={{ bg: c.overlay.soft }}>
                        <Image
                          src={product.img}
                          alt={product.name}
                          w="24px"
                          h="24px"
                          borderRadius="6px"
                          objectFit="contain"
                        />
                        <Box>
                          <Text fontSize="sm" fontWeight={500} color={c.text.muted} letterSpacing="-0.03em">
                            {product.name}
                          </Text>
                          <Text fontSize="xs" color={c.text.faint} letterSpacing="-0.03em">
                            {product.description}
                          </Text>
                        </Box>
                      </HStack>
                    </Wrapper>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* Social */}
          <Box mb={1}>
            <Flex
              align="center"
              justify="space-between"
              py={2.5}
              cursor="pointer"
              onClick={() => setMobileSection(mobileSection === "social" ? null : "social")}
            >
              <Text fontSize="md" fontWeight={500} color={c.text.primary} letterSpacing="-0.03em">
                Social
              </Text>
              <Icon
                as={FiChevronRight}
                boxSize={3.5}
                color={c.text.subtle}
                transition="transform 0.2s"
                transform={mobileSection === "social" ? "rotate(90deg)" : "rotate(0deg)"}
              />
            </Flex>
            {mobileSection === "social" && (
              <Box pl={2} pb={2}>
                {socials.map((social) => (
                  <ChakraLink
                    key={social.name}
                    href={social.href}
                    isExternal
                    _hover={{ textDecoration: "none" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <HStack spacing={2.5} py={2} px={2} borderRadius="8px" _hover={{ bg: c.overlay.soft }}>
                      <Icon as={social.icon} boxSize={3.5} color={c.text.muted} />
                      <Text fontSize="sm" fontWeight={500} color={c.text.muted} letterSpacing="-0.03em">
                        {social.name}
                      </Text>
                    </HStack>
                  </ChakraLink>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
