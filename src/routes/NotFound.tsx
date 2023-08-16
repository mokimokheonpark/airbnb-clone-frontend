import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg={"beige"} justifyContent={"center"} minH={"100vh"}>
      <Heading>404. Page Not Found.</Heading>
      <Text>The requested URL was not found on the server.</Text>
      <Link to="/">
        <Button colorScheme={"blue"} variant={"link"}>
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
