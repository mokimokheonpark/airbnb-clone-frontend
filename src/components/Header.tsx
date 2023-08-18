import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaAirbnb, FaMoon } from "react-icons/fa";
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
  return (
    <HStack
      justifyContent={"space-between"}
      px={10}
      py={5}
      borderBottomWidth={1}
    >
      <Box color={"red.500"}>
        <Link to={"/"}>
          <FaAirbnb size={48} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          aria-label={"Toggle dark mode"}
          icon={<FaMoon />}
          variant={"ghost"}
        />
        <Button onClick={onSignUpOpen} colorScheme={"red"}>
          Sign Up
        </Button>
        <Button onClick={onSignInOpen} colorScheme={"red"}>
          Sign In
        </Button>
      </HStack>
      <SignIn isOpen={isSignInOpen} onClose={onSignInClose} />
      <SignUp isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
