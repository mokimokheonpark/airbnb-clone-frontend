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
import { Link, useNavigate } from "react-router-dom";
import { FaCamera, FaStar } from "react-icons/fa";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  country,
  city,
  price,
  rating,
  isOwner,
}: IRoomProps) {
  const textColor = useColorModeValue("gray.600,", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box
          position={"relative"}
          overflow={"hidden"}
          mb={3}
          rounded={"2xl"}
          w={"100%"}
        >
          {imageUrl ? (
            <Image src={imageUrl} minH={"280"} objectFit={"cover"} />
          ) : (
            <Box minH={"280px"} h={"100%"} w={"100%"} p={10} bg={"gray.300"} />
          )}
          {isOwner ? (
            <Button
              onClick={onCameraClick}
              variant={"unstyled"}
              position={"absolute"}
              top={0}
              right={0}
              color={"white"}
            >
              <FaCamera size={20} />
            </Button>
          ) : null}
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"99fr 1fr"}>
            <Text display={"block"} as={"b"} noOfLines={1} fontSize={"md"}>
              {name}
            </Text>
            <HStack spacing={0.5}>
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
        </Box>
        <Text fontSize={"sm"} color={textColor}>
          {city}, {country}
        </Text>
        <Text fontSize={"sm"} color={textColor}>
          <Text as={"b"}>${price}</Text> per night
        </Text>
      </VStack>
    </Link>
  );
}
