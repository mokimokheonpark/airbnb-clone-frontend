import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
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
  useDisclosure,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import {
  FaAirbnb,
  FaMoon,
  FaUser,
  FaLock,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

export default function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
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

              <HStack my={8}>
                <Divider />
                <Text color={"gray.500"} fontSize={"sm"} as={"b"}>
                  OR
                </Text>
                <Divider />
              </HStack>
              <VStack>
                <Button leftIcon={<FaGoogle />} colorScheme={"blue"} w={"100%"}>
                  Continue with Google
                </Button>
                <Button leftIcon={<FaGithub />} colorScheme={"blue"} w={"100%"}>
                  Continue with GitHub
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <Outlet />
    </Box>
  );
}
