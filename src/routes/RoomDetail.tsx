import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);
  return (
    <Box mt={10} px={{ base: 10, lg: 40 }}>
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
              <Image
                src={data?.photos[index]?.file}
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
