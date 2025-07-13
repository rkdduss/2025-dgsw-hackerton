import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const CommentBox = () => {
  const [heart, setHeart] = useState(false);
  const handleHeart = () => {
    setHeart((prev) => !prev);
  };
  return (
    <CommentBoxContainer>
      <UserInfo>
        <UserProfileImage />
        <UserInfoColumn>
          <Username>알바님</Username>
          <UserLocation>경력 3년 - 1시간 전</UserLocation>
        </UserInfoColumn>
        <TouchableOpacity onPress={handleHeart} activeOpacity={0.7}>
          <Ionicons
            name={heart ? "heart-sharp" : "heart-outline"}
            size={24}
            color={heart ? "#5457F7" : "#A0A0A0"}
          />
        </TouchableOpacity>
      </UserInfo>
      <CommentDetail>그업체 유명한곳이에요... 저도 당했습니다 여러분도 조심하세요!</CommentDetail>
    </CommentBoxContainer>
  );
};
const CommentBoxContainer = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: 20px;
`;

const UserInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;
const UserProfileImage = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: gray;
  margin-right: 10px;
`;

const UserInfoColumn = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
`;
const Username = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;
const UserLocation = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textgray};
`;

const CommentDetail = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color-scheme: #141414;
`