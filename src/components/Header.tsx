import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Header() {
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
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
        <LightMode>
          <Button onClick={onSignUpOpen} colorScheme={"red"}>
            Sign Up
          </Button>
          <Button onClick={onSignInOpen} colorScheme={"red"}>
            Sign In
          </Button>
        </LightMode>
      </HStack>
      <SignIn isOpen={isSignInOpen} onClose={onSignInClose} />
      <SignUp isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
