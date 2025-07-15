import { api } from "@/libs/api";
import axios from "axios";

export const userService = {
  patch: (email: String, password: String) => axios.post("/auth/sign-in", {
    email:  email,
    password: password
  }),
};  