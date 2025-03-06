import React from "react";
import { Box, Text, Link, Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import { RiTwitterFill, RiInstagramFill, RiLinkedinBoxFill } from "react-icons/ri";

const Footer = () => {
  const footerBgColor = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box bg={footerBgColor} py={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="container.lg"
        mx="auto"
        px={4}
      >
        <Text fontSize="sm" color="gray.500">
          &copy; 2025 Manobhiram Bhatter. All rights reserved.
        </Text>
        <Flex alignItems="center">
          <Link mx={2} fontSize="sm" color="gray.500">
            Privacy Policy
          </Link>
          <Link mx={2} fontSize="sm" color="gray.500">
            Terms of Service
          </Link>
          <Flex ml={4}>
            <Link href="https://x.com/antigamer07" isExternal mx={2}>
              <Icon as={RiTwitterFill} boxSize={5} color={iconColor} _hover={{ color: "blue.500" }} />
            </Link>
            <Link href="https://www.instagram.com/antigamer07/" isExternal mx={2}>
              <Icon as={RiInstagramFill} boxSize={5} color={iconColor} _hover={{ color: "pink.500" }} />
            </Link>
            <Link href="https://www.linkedin.com/in/manobhiram-bhatter/" isExternal mx={2}>
              <Icon as={RiLinkedinBoxFill} boxSize={5} color={iconColor} _hover={{ color: "blue.600" }} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
