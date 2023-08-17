import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SocialSignIn() {
  return (
    <Box mb={4}>
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
    </Box>
  );
}
