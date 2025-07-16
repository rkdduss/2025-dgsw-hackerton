import { api } from "@/libs/api";


export const fetchBoards = async () => {
    const res = await api.axiosInstance.get("/board");
    return res.data;
  };