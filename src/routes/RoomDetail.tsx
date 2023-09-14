import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getRoomReviews);
  return (
    <Box mt={10} px={{ base: 10, lg: 40 }} pb={40}>
      <Skeleton width={"50%"} height={43} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={10}
        height={"60vh"}
        templateRows={"repeat(2, 1fr)"}
        templateColumns={"repeat(4, 1fr)"}
        gap={2}
        rounded={"xl"}
        overflow={"hidden"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            rowSpan={index === 0 ? 2 : 1}
            colSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} width={"100%"} height={"100%"}>
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  src={data?.photos[index]?.file}
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack mt={10} width={"100%"} justifyContent={"space-between"}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading} height={30}>
            <Heading fontSize={"2xl"}>Hosted by {data?.owner.name}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={30}>
            <HStack width={"100%"} justifyContent={"flex-start"}>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
              <Text>&</Text>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar src={data?.owner.avatar} name={data?.owner.name} size={"xl"} />
      </HStack>
      <Box mt={10}>
        <Heading mb={5} fontSize={"2xl"}>
          <HStack>
            <FaStar />
            <Text>{data?.rating}</Text>
            <Text>from</Text>
            <Text>
              {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Heading>
        <Container mt={16} marginX={"none"} maxWidth={"container.lg"}>
          <Grid gap={10} templateColumns={"1fr 1fr"}>
            {reviewsData?.map((review, index) => (
              <VStack alignItems={"flex-start"} key={index}>
                <HStack>
                  <Avatar
                    src={review.user.avatar}
                    name={review.user.name}
                    size={"md"}
                  />
                  <VStack spacing={0} alignItems={"flex-start"}>
                    <Heading fontSize={"md"}>{review.user.name}</Heading>
                    <HStack spacing={1}>
                      <FaStar size={12} />
                      <Text>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text>{review.review}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
