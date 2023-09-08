import IsHostPage from "../components/IsHostPage";
import IsLoggedInPage from "../components/IsLoggedInPage";

export default function UploadRoom() {
  return (
    <IsLoggedInPage>
      <IsHostPage>
        <h1>You are going to upload your room on this page.</h1>
      </IsHostPage>
    </IsLoggedInPage>
  );
}
