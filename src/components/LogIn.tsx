import React, { useState } from "react";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setEmailError("It is not a valid email");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={onSubmit as any}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                required
                type={"username"}
                name={"username"}
                placeholder={"Username"}
                onChange={onChange}
                value={username}
                variant={"filled"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                onChange={onChange}
                value={username}
                variant={"filled"}
              />
            </InputGroup>
          </VStack>
          <Button type={"submit"} colorScheme={"red"} w={"100%"} mt={4}>
            Log In
          </Button>
          <SocialLogIn />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
