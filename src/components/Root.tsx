import { Box, Button, HStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { FaAirbnb } from "react-icons/fa";

export default function Root() {
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
          <Button colorScheme={"red"}>Sign Up</Button>
          <Button>Sign In</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}
