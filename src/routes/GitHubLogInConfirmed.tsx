import { useEffect } from "react";
import { Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { gitHubLogIn } from "../api";

export default function GitHubLogInConfirmed() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logInConfirmed = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await gitHubLogIn(code);
      if (status === 200) {
        toast({
          title: "Logged In",
          description: "You have been successfully logged in.",
          status: "success",
          position: "top",
        });
        queryClient.refetchQueries(["my-profile"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    logInConfirmed();
  }, []);
  return (
    <VStack mt={10} justifyContent={"center"}>
      <Heading>You are logging in...</Heading>
      <Spinner mt={10} size={"lg"} />
    </VStack>
  );
}
