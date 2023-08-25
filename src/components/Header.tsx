import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { logOut } from "../api";
import useUser from "../lib/useUser";

export default function Header() {
  const {
    isOpen: isLogInOpen,
    onOpen: onLogInOpen,
    onClose: onLogInClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const { userLoading, user, isLoggedIn } = useUser();
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "Log Out",
      description: "You are logging out...",
      status: "loading",
      position: "top",
    });
    await logOut();
    queryClient.refetchQueries(["my-profile"]);
    toast.update(toastId, {
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
    });
  };
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      px={40}
      py={5}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <Link to={"/"}>
          <FaAirbnb size={48} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          aria-label={"Toggle dark mode"}
          icon={<Icon />}
          variant={"ghost"}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <LightMode>
              <Button onClick={onSignUpOpen} colorScheme={"red"}>
                Sign Up
              </Button>
              <Button onClick={onLogInOpen} colorScheme={"red"}>
                Log In
              </Button>
            </LightMode>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar src={user?.avatar} name={user?.name} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LogIn isOpen={isLogInOpen} onClose={onLogInClose} />
      <SignUp isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
