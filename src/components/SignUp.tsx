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
import { FaUserCircle, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import SocialSignIn from "./SocialSignIn";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUp({ isOpen, onClose }: SignUpProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserCircle />
                  </Box>
                }
              />
              <Input placeholder={"Name"} variant={"filled"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input placeholder={"Email"} variant={"filled"} />
            </InputGroup>
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
            Sign Up
          </Button>
          <SocialSignIn />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
