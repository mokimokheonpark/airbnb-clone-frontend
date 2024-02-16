import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
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
import { useNavigate, useParams } from "react-router-dom";
import { FaCamera, FaStar } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import "../calendar.css";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getRoomReviews);
  const [dates, setDates] = useState<Date[] | undefined>();
  const handleDateChange = (value: any) => {
    setDates(value);
  };
  const { isLoading: isCheckBookingLoading, data: checkBookingData } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    { cacheTime: 0, enabled: dates !== undefined }
  );
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${roomPk}/photos`);
  };
  return (
    <Box mt={10} px={{ base: 10, lg: 40 }} pb={40}>
      <Skeleton width={"50%"} height={43} isLoaded={!isLoading}>
        <Flex alignItems={"center"}>
          <Heading>{data?.name}</Heading>
          {data?.is_owner ? (
            <Button
              onClick={onCameraClick}
              variant={"unstyled"}
              color={"tomato"}
              ml={5}
            >
              <FaCamera size={40} />
            </Button>
          ) : null}
        </Flex>
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
      <Grid templateColumns={"2fr 1fr"}>
        <Box>
          <HStack mt={10} spacing={5}>
            <Avatar
              src={data?.owner.avatar}
              name={data?.owner.name}
              size={"xl"}
            />
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
          </HStack>
          <Box mt={20}>
            <Heading mb={5} fontSize={"2xl"}>
              <HStack>
                <FaStar />
                <Text>{data?.rating}</Text>
                <Text>from</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Container mt={10} marginX={-5}>
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
        <Box pt={10}>
          <Calendar
            onChange={handleDateChange}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 52)}
            minDetail={"month"}
            prev2Label={null}
            next2Label={null}
            selectRange
            goToRangeStartOnSelect
            formatDay={(_, date) =>
              date.toLocaleString("en", { day: "numeric" })
            }
          />
          <Button
            mt={3}
            w={"100%"}
            colorScheme={"red"}
            isLoading={isCheckBookingLoading && dates !== undefined}
            isDisabled={!checkBookingData?.ok}
          >
            Make Your Booking
          </Button>
          {!isCheckBookingLoading && !checkBookingData?.ok ? (
            <Text mt={2} color={"red.500"}>
              The room has already been booked for some of the dates by someone.
            </Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
