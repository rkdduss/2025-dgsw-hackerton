import { DismissButton } from "@/components/button/dismiss_button";
import { CommentBox } from "@/components/section/comment-box";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function CommunityDetailPage() {
  const [heart, setHeart] = useState(false);
  const handleHeart = () => {
    setHeart((prev) => !prev);
  };
  return (
    <Container>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Header>
          <DismissButton />
          <HeaderText>커뮤니티</HeaderText>
        </Header>

        <ScrollView>
          <ImageArea />
          <UserInfo>
            <UserProfileImage />
            <UserInfoColumn>
              <Username>알바님</Username>
              <UserLocation>율하역 인근 거주</UserLocation>
            </UserInfoColumn>
            <TouchableOpacity onPress={handleHeart} activeOpacity={0.7}>
              <Ionicons
                name={heart ? "heart-sharp" : "heart-outline"}
                size={24}
                color={heart ? "#5457F7" : "#A0A0A0"}
              />
            </TouchableOpacity>
          </UserInfo>

          <Title>어이가 없습니다 임금 체불 당했습니다.</Title>
          <Time>1시간 전</Time>
          <Detail>
            저 정보처리기능사 오너인데 돈을 안주네요;; 진짜 정보처리기능사딴다고
            얼마나 고생했는데요...
          </Detail>
          <CommentCount>댓글 (1개)</CommentCount>

          <CommentBox></CommentBox>
          <CommentBox></CommentBox>
          <CommentBox></CommentBox>
          <CommentBox></CommentBox>
          
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0 20px;
`;

const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

const ImageArea = styled.View`
  width: 100%;
  height: 362px;
  background-color: #f3f4f5;
  border-radius: 10px;
  margin-bottom: 16px;
`;

//유저정보

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

//내용부분

const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: black;
  margin-bottom: 3px;
`;
const Time = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
  margin-bottom: 15px;
`;
const Detail = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #141414;
  margin-bottom: 25px;
`;

const CommentCount = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #5457f7;
  margin-bottom: 20px;
`;
