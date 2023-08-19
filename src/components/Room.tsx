import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
  imageUrl: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
}

export default function Room({
  imageUrl,
  name,
  country,
  city,
  price,
  rating,
}: IRoomProps) {
  const textColor = useColorModeValue("gray.600,", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"2xl"}>
        <Image minH={"280"} src={imageUrl} />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          top={0}
          right={0}
          color={"white"}
        >
          <FaRegHeart size={20} />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text display={"block"} as={"b"} noOfLines={1} fontSize={"md"}>
            {name}
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={textColor}>
          {city}, {country}
        </Text>
      </Box>
      <Text fontSize={"sm"} color={textColor}>
        <Text as={"b"}>${price}</Text> per night
      </Text>
    </VStack>
  );
}
