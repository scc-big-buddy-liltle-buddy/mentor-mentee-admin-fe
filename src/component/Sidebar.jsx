"use client";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut, FiGrid, FiDatabase, FiShare2, FiMenu } from "react-icons/fi";
import CIOLogo from "../assets/logo/CIOLogo";
import { useEffect } from "react";
const LinkItems = [
  { name: "Dashboard", icon: FiGrid, pathname: "/dashboard" },
  { name: "Manage", icon: FiDatabase, pathname: "/manage" },
  { name: "Match", icon: FiShare2, pathname: "/match" },
  { name: "Logout", icon: FiLogOut, pathname: "/logout" },
];

export default function SimpleSidebar({ content }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" w="100%" size={"full"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} height={"100%"} p="4">
        {content}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const findLinkItemByPathname = (pathname) => {
    return LinkItems.find((item) => item.pathname === pathname) || LinkItems[0];
  };

  const navigate = useNavigate();
  // Get current url path
  let location = useLocation();
  const [current, setCurrent] = React.useState(
    findLinkItemByPathname(location.pathname).name || LinkItems[0].name
  );

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CIOLogo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        gap={2}
        aria-label="Main Navigation"
      >
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            isHighlighted={current === link.name}
            icon={link.icon}
            onClick={() => {
              if (link.name != LinkItems[LinkItems.length - 1].name) {
                navigate(`/${link.name.toLowerCase()}`);
                setCurrent(link.name);
              }
            }}
          >
            {link.name}
          </NavItem>
        ))}
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, isHighlighted, children, ...rest }) => {
  return (
    <Box
      as="a"
      color="scc_blue.100"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isHighlighted ? "scc_blue.100" : undefined}
        color={isHighlighted ? "white" : undefined}
        _hover={{
          bg: "scc_blue.100",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box p={2}>
        <CIOLogo />
      </Box>
    </Flex>
  );
};
