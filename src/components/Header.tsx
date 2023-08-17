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

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Button colorScheme={"red"}>Sign Up</Button>
        <Button onClick={onOpen} colorScheme={"red"}>
          Sign In
        </Button>
      </HStack>
      <SignIn isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
