import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";

export default function UploadPhotos() {
  const { register, watch } = useForm();
  const { roomPk } = useParams();
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
            <Heading textAlign={"center"}>Upload Photos</Heading>
            <VStack spacing={5} mt={10}>
              <FormControl>
                <Input {...register("file")} type={"file"} accept={"image/*"} />
              </FormControl>
              <Button w={"full"} colorScheme={"red"}>
                Upload the photo
              </Button>
            </VStack>
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
