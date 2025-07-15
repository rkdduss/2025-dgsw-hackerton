import { api } from "@/libs/api";
import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("https://apiv2-rwiisdnqaa-du.a.run.app/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (e) {
    console.error("❌ 로그인 에러:", e);
    throw e;
  }
};

interface SignupRequest {
    email: string;
    password: string;
    name: string;
    location: string;
    career: number;
  }
  
  export const signup = async (data: SignupRequest) => {
    try {
      const res = await axios.post("https://apiv2-rwiisdnqaa-du.a.run.app/auth/signup", data);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data)
      }
      console.error("회원가입 실패:", e);
      
      throw e;
    }
  };