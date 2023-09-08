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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import SocialLogIn from "./SocialLogIn";
import { userLogIn } from "../api";

interface ILogInProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LogIn({ isOpen, onClose }: ILogInProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(userLogIn, {
    onSuccess: () => {
      toast({
        title: "Logged In",
        description: "You have been successfully logged in.",
        status: "success",
        position: "top",
      });
      onClose();
      queryClient.refetchQueries(["my-profile"]);
      reset();
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                placeholder={"Username"}
                {...register("username", { required: "username is required" })}
                isInvalid={Boolean(errors.username?.message)}
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
                placeholder={"Password"}
                {...register("password", { required: "password is required" })}
                isInvalid={Boolean(errors.password?.message)}
                variant={"filled"}
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text textAlign={"center"} fontSize={"sm"} color={"red.500"}>
              Invalid Username or Password
            </Text>
          ) : null}
          <Button
            type={"submit"}
            colorScheme={"red"}
            w={"100%"}
            mt={4}
            isLoading={mutation.isLoading}
          >
            Log In
          </Button>
          <SocialLogIn />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
