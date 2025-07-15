import { api } from "@/libs/api";
import axios from "axios";

export const userService = {
  patch: (email: String, password: String) =>
    axios.post("/auth/sign-in", {
      email: email,
      password: password,
    }),
};

export const fetchMyInfo = async () => {
  return api.axiosInstance.get("/user/me");
};

export interface UserResponse {
  id:  string;
  email:  string;
  name: string;
  location:  string;
  career: 2;
}
