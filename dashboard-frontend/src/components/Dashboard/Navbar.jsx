import React from "react";
import {
  Box,
  Flex,
  Container,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <Box
      py={2}
      bgGradient="linear(to-b,rgb(0, 204, 255),rgb(0, 183, 255))"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search..."
            size="sm"
            borderRadius="full"
            bg={colorMode === "light" ? "white" : "gray.800"}
            px={4}
            py={1}
            color={colorMode === "light" ? "gray.800" : "white"}
            _placeholder={{
              color: colorMode === "light" ? "gray.500" : "gray.300",
            }}
            _focus={{ outline: "none" }}
          />

          {/* Icons & Menu */}
          <Flex align="center">
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              bg="transparent"
              border="none"
              onClick={toggleColorMode}
            />
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon boxSize={6} />}
              bg="transparent"
              border="none"
            >
              <Badge colorScheme="red" color="red">
                3
              </Badge>
            </IconButton>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<ChevronDownIcon boxSize={6} />}
                variant="unstyled"
              />
              <MenuList>
                <MenuItem>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
