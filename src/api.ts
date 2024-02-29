import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import { formatDate } from "./lib/utils";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : "https://backend.mokiproject.xyz/api/v1/",
  withCredentials: true,
});

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMyProfile = () =>
  instance.get("users/my-profile").then((response) => response.data);

export const logOut = () =>
  instance
    .post("users/log-out", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const gitHubLogIn = (code: string) =>
  instance
    .post(
      "users/github-log-in",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface IUserLogInInfo {
  username: string;
  password: string;
}

export const userLogIn = ({ username, password }: IUserLogInInfo) =>
  instance
    .post(
      "users/log-in",
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export interface ISignUpInfo {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const userSignUp = ({ name, email, username, password }: ISignUpInfo) =>
  instance
    .post(
      `users/sign-up`,
      { name, email, username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get("rooms/amenities/").then((response) => response.data);

export const getCategories = () =>
  instance.get("categories/").then((response) => response.data);

export interface IUploadRoomInfo {
  name: string;
  country: string;
  city: string;
  address: string;
  price: number;
  room_kind: string;
  rooms: number;
  toilets: number;
  amenities: number[];
  pet_friendly: boolean;
  description: string;
  category: number;
}

export const uploadRoom = (info: IUploadRoomInfo) =>
  instance
    .post("rooms/", info, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const uploadPhoto = (roomPk: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return instance
    .post(`rooms/${roomPk}/photos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

type CheckBookingQueryKey = [string, string?, Date[]?];

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
  const [_, roomPk, dates] = queryKey;
  if (dates) {
    const [checkInDate, checkOutDate] = dates;
    const checkIn = formatDate(checkInDate);
    const checkOut = formatDate(checkOutDate);
    return instance
      .get(
        `rooms/${roomPk}/bookings/availability?room_check_in=${checkIn}&room_check_out=${checkOut}`
      )
      .then((response) => response.data);
  }
};
