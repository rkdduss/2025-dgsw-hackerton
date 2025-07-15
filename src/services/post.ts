import { api } from "@/libs/api";

interface PostUploadRequest {
  userId: string;
  title: string;
  content: string;
  images: string[]; // base64 또는 URL 형식 예상
  isRecruitment: boolean;
  type: string; // 예: "구인", "구직" 등
  certificates: string[]; // 자격증 ID 또는 이름 리스트
}

export const uploadPost = (data: PostUploadRequest) => {
  return api.axiosInstance.post("/post", data);
};

export const fetchPosts = async () => {
    return api.axiosInstance.get("/post");
}

export interface PostResponse {
    id: string;
    userId: string;
    title: string;
    content: string;
    images: string[]; // 이미지 URL 배열 (없을 수 있음)
    isRecruitment: boolean;
    type: string; // "구인", "구직", "프리랜서" 등
    certificates: string[]; // 자격증 이름 배열
  }