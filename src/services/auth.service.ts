import { api } from "@/libs/api";
import axios from "axios";

export const authService = {
  signUp: (email: String, username: String, password: String) => axios.post("/auth/sign-up", {
    email:  email,
    username: username,
    password: password
  }),
  signIn: (email: String, password: String) => axios.post("/auth/sign-in", {
    email:  email,
    password: password
  }),
};