import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { getAmenities, getCategories } from "../api";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";
import { IAmenity, ICategory } from "../types";

export default function UploadRoom() {
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  return (
    <IsLoggedInPage>
      <IsHostPage>
        <Box
          mt={10}
          pb={40}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload Room</Heading>
            <VStack as={"form"} spacing={10} mt={50}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input required type={"text"} />
              </FormControl>

              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input required type={"text"} />
              </FormControl>

              <FormControl>
                <FormLabel>City</FormLabel>
                <Input required type={"text"} />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input required type={"text"} />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select placeholder={"Choose one"}>
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.category_kind === "rooms"
                        ? category.name
                        : null}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select placeholder={"Choose one"}>
                  <option value={"entire_place"}>Entire Place</option>
                  <option value={"private_room"}>Private Room</option>
                  <option value={"shared_room"}>Shared Room</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input type={"number"} min={0} />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input type={"number"} min={0} />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Price per night</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaDollarSign />} />
                  <Input type={"number"} min={0} />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea />
              </FormControl>

              <FormControl>
                <FormLabel>Pet friendly?</FormLabel>
                <Checkbox>Yes</Checkbox>
              </FormControl>

              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                  {amenities?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox>{amenity.name}</Checkbox>
                    </Box>
                  ))}
                </Grid>
              </FormControl>

              <Button colorScheme={"red"} size={"lg"} w={"100%"}>
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
