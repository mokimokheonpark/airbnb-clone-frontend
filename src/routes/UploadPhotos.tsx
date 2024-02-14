import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";
import { uploadPhoto } from "../api";

export default function UploadPhotos() {
  const { roomPk } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = () => {
    if (!roomPk || !selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file.",
        status: "error",
        position: "top",
      });
      return;
    }
    setUploading(true);
    uploadPhoto(parseInt(roomPk), selectedFile)
      .then(() => {
        toast({
          title: "Photo Uploaded",
          description: "You have successfully uploaded a photo.",
          status: "success",
          position: "top",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "There was an error on uploading the photo.",
          status: "error",
          position: "top",
        });
      })
      .finally(() => {
        setUploading(false);
      });
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
            <Heading textAlign={"center"} mb={50}>
              Upload Photos
            </Heading>
            <Input type="file" onChange={handleFileChange} />
            <Button
              type="submit"
              w="full"
              colorScheme={"red"}
              mt={50}
              onClick={handleUpload}
              isLoading={uploading}
            >
              Upload the Photo
            </Button>
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
