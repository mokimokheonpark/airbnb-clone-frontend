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
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { AxiosError } from "axios";
import SocialLogIn from "./SocialLogIn";
import { userSignUp } from "../api";

interface ISignUpProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUp({ isOpen, onClose }: ISignUpProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(userSignUp, {
    onMutate: () => {},
    onError: (error: AxiosError) => {
      const error_message = Object.values(error.response?.data as Object)[0];
      toast({
        title: "Sign Up Error",
        description: error_message,
        status: "error",
        position: "top",
      });
    },
    onSuccess: () => {
      toast({
        title: "Sign Up",
        description: "You have successfully signed up.",
        status: "success",
        position: "top",
      });
      queryClient.refetchQueries(["my-profile"]);
      onClose();
    },
  });
  const onSubmit = ({ name, email, username, password }: IForm) => {
    mutation.mutate({ name, email, username, password });
    reset();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserCircle />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="Name"
                required
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", {
                  required: "Name is required.",
                })}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="Email"
                type="email"
                required
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", {
                  required: "Email is required.",
                })}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                variant={"filled"}
                placeholder="Username"
                required
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 4,
                    message: "Username must contain at least 4 characters.",
                  },
                  maxLength: {
                    value: 16,
                    message: "Username must contain at most 16 characters.",
                  },
                })}
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
                variant={"filled"}
                placeholder="Password"
                type="password"
                required
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters.",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must contain at most 16 characters.",
                  },
                })}
              />
            </InputGroup>
          </VStack>
          <Text fontSize={"sm"} color={"red.500"}>
            {errors.name?.message}
          </Text>
          <Text fontSize={"sm"} color={"red.500"}>
            {errors.email?.message}
          </Text>
          <Text fontSize={"sm"} color={"red.500"}>
            {errors.username?.message}
          </Text>
          <Text fontSize={"sm"} color={"red.500"}>
            {errors.password?.message}
          </Text>
          <Button
            mt={4}
            w="100%"
            colorScheme="red"
            type={"submit"}
            isLoading={mutation.isLoading}
          >
            Sign Up
          </Button>
          {/* <SocialLogIn /> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
