import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api";
import { IPrivateUser } from "../types";

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IPrivateUser>(
    ["my-profile"],
    getMyProfile,
    {
      retry: false,
    }
  );
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
