import React, { useState } from "react";
import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";
import { uploadPhoto } from "../api";

export default function UploadPhotos() {
  const { roomPk } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!roomPk || !selectedFile) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError("");

    uploadPhoto(parseInt(roomPk), selectedFile)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError("Error uploading photo.");
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
            <input type="file" onChange={handleFileChange} />
            <Button
              type="submit"
              w="full"
              colorScheme={"red"}
              mt={50}
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload the Photo"}
            </Button>
            {error && <div>{error}</div>}
            {success && <div>Photo uploaded successfully!</div>}
          </Container>
        </Box>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
