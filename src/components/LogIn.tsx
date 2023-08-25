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
import SocialLogIn from "./SocialLogIn";

interface LogInProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogIn({ isOpen, onClose }: LogInProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
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
            Log In
          </Button>
          <SocialLogIn />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
