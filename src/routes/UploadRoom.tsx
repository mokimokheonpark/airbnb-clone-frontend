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
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import axios from "axios";
import {
  IUploadRoomInfo,
  getAmenities,
  getCategories,
  uploadRoom,
  uploadPhoto,
} from "../api";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";

export default function UploadRoom() {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const mutation = useMutation(uploadRoom, {
  //   onSuccess: (data: IRoomDetail) => {
  //     toast({
  //       title: "Room Uploaded",
  //       description: "You have successfully uploaded a room.",
  //       status: "success",
  //       position: "top",
  //     });
  //     navigate(`/rooms/${data.id}`);
  //   },
  // });
  const mutation = useMutation(uploadPhoto);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      mutation.mutate(file);
    }
  };
  const { data: amenities } = useQuery<IAmenity[]>(["amenities"], getAmenities);
  const { data: categories } = useQuery<ICategory[]>(
    ["categories"],
    getCategories
  );
  // const onSubmit = (data: IUploadRoomInfo) => {
  //   mutation.mutate(data);
  // };
  const onSubmit = async (data: IUploadRoomInfo) => {
    try {
      // 1. Upload the photo and get the URL
      const photoUrl = await uploadPhoto(data.photo); // Assuming 'photo' is the field name for the uploaded file

      // 2. Attach the uploaded photo URL to the room data
      const roomDataWithPhoto = { ...data, photo: photoUrl };

      // 3. Send the room data with the photo URL to the server
      const response = await axios.post(
        "/api/v1/medias/upload-room",
        roomDataWithPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 4. Handle the server response as needed
      if (response.status === 201) {
        toast({
          title: "Room Uploaded",
          description: "You have successfully uploaded a room.",
          status: "success",
          position: "top",
        });
        navigate(`/rooms/${response.data.id}`);
      } else {
        // Handle other status codes or error responses
        console.error("Error uploading room:", response.data);
      }
    } catch (error) {
      // Handle errors during the process
      console.error("Error during submission:", error);
    }
  };
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
            <VStack
              as={"form"}
              onSubmit={handleSubmit(onSubmit)}
              spacing={10}
              mt={50}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  required
                  type={"text"}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country", { required: true })}
                  required
                  type={"text"}
                />
              </FormControl>

              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register("city", { required: true })}
                  required
                  type={"text"}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("address", { required: true })}
                  required
                  type={"text"}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  {...register("category", { required: true })}
                  placeholder={"Choose one"}
                  required
                >
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
                <Select
                  {...register("room_kind", { required: true })}
                  placeholder={"Choose one"}
                  required
                >
                  <option value={"entire_place"}>Entire Place</option>
                  <option value={"private_room"}>Private Room</option>
                  <option value={"shared_room"}>Shared Room</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register("rooms", { required: true })}
                    required
                    type={"number"}
                    min={0}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register("toilets", { required: true })}
                    required
                    type={"number"}
                    min={0}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Price per night</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaDollarSign />} />
                  <Input
                    {...register("price", { required: true })}
                    required
                    type={"number"}
                    min={0}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Pet friendly?</FormLabel>
                <Checkbox {...register("pet_friendly")}>Yes</Checkbox>
              </FormControl>

              <FormControl>
                <FormLabel>Amenities (Choose at least one amenity)</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap={5}>
                  {amenities?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox
                        value={amenity.pk}
                        {...register("amenities", { required: true })}
                      >
                        {amenity.name}
                      </Checkbox>
                    </Box>
                  ))}
                </Grid>
              </FormControl>

              <FormControl>
                <FormLabel>Upload Photo</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  {...register("photo")}
                />
              </FormControl>

              {mutation.isError ? (
                <Text color={"red.500"}>Error from useMutation</Text>
              ) : null}
              <Button
                type={"submit"}
                isLoading={mutation.isLoading}
                colorScheme={"red"}
                size={"lg"}
                w={"100%"}
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
