import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";
import { createPhoto, getUploadURL, uploadImage } from "../api";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const toast = useToast();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        title: "Image uploaded",
        description: "You have successfully uploaded the image.",
        status: "success",
        position: "top",
        isClosable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "Image",
          file: `http://127.0.0.1:8000/user-uploads/${result.id}`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });
  const onSubmit = () => {
    uploadURLMutation.mutate();
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
            <Heading textAlign={"center"}>Upload Photos</Heading>
            <VStack
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={5}
              mt={10}
            >
              <FormControl>
                <Input {...register("file")} type={"file"} accept={"image/*"} />
              </FormControl>
              <Button
                isLoading={
                  createPhotoMutation.isLoading ||
                  uploadImageMutation.isLoading ||
                  uploadURLMutation.isLoading
                }
                type="submit"
                w="full"
                colorScheme={"red"}
              >
                Upload the photo
              </Button>
            </VStack>
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
