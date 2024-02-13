import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
    <div>
      <h1>Upload Photo Test</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Button"}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Photo uploaded successfully!</div>}
    </div>
  );
}
