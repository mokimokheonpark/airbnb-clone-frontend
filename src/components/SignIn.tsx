import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import SocialSignIn from "./SocialSignIn";

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignIn({ isOpen, onClose }: SignInProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUser />
                  </Box>
                }
              />
              <Input placeholder={"Username"} variant={"filled"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input placeholder={"Password"} variant={"filled"} />
            </InputGroup>
          </VStack>
          <Button colorScheme={"red"} w={"100%"} mt={4}>
            Sign In
          </Button>
          <SocialSignIn />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
