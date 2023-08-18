import { Box, HStack, Skeleton } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton height={280} mb={5} rounded={"2xl"} />
      <HStack justifyContent={"space-between"}>
        <Skeleton width={"65%"} height={5} mb={1} rounded={"lg"} />
        <Skeleton width={"15%"} height={5} rounded={"lg"} />
      </HStack>
      <Skeleton width={"50%"} height={5} mb={3} rounded={"lg"} />
      <Skeleton width={"35%"} height={5} mb={3} rounded={"lg"} />
      <Skeleton width={"20%"} height={5} rounded={"lg"} />
    </Box>
  );
}
