import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";

export default function UploadRoom() {
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
            <VStack as={"form"} spacing={5} mt={50}>
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
                <Checkbox>Pet friendly?</Checkbox>
              </FormControl>
            </VStack>
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
