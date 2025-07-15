import React, { useEffect } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as S from "../../styles/pages/chat";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { api } from "@/api/api";

export default function ProfilePage() {
  const router = useRouter();

  const handleChatPress = (chatId: string) => {
    // 채팅방 상세 화면으로 이동
    router.push(`/chat-detail?id=${chatId}`);
  };

  const getMe = async () => {
    try {
      const res = await api.axiosInstance.get("/user/me");
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {}, []);

  const handleDeleteAccount = async () => {
    try {
      await api.axiosInstance.delete("/user/me");
      Alert.alert("회원탈퇴 완료");
      router.replace("/login");
    } catch (e) {
      Alert.alert("회원탈퇴 실패", "잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <S.Container>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <S.Header>
          <S.HeaderTitle>내정보</S.HeaderTitle>
        </S.Header>
        <ProfileContainer>
          <Profile></Profile>
          <ProfileInfo>
            <ProfileName>먼지</ProfileName>
            <ProfileMap>먼지없음</ProfileMap>
          </ProfileInfo>
        </ProfileContainer>
        <Diveder />
        <SettingCotainer>
          <SettingTitle>이용약관</SettingTitle>
          <Entypo name="chevron-thin-right" size={18} color="black" />
        </SettingCotainer>
        <SettingCotainer>
          <SettingTitle>개인정보처리약관</SettingTitle>
          <Entypo name="chevron-thin-right" size={18} color="black" />
        </SettingCotainer>

        <SettingCotainer>
          <SettingTitle>로그아웃</SettingTitle>
        </SettingCotainer>
        <SettingCotainer>
          <SettingTitleRed onPress={handleDeleteAccount}>
            회원탈퇴
          </SettingTitleRed>
        </SettingCotainer>
      </SafeAreaView>
    </S.Container>
  );
}

const Profile = styled.View`
  width: 60px;
  height: 60px;
  background-color: #5457f7;
  border-radius: 100px;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin: 20px;
  margin-top: 10px;
`;

const ProfileInfo = styled.View`
  gap: 5px;
`;

const ProfileName = styled.Text`
  font-weight: 700;
  font-size: 18px;
`;
const ProfileMap = styled.Text`
  font-size: 14px;
`;

const Diveder = styled.View`
  width: 100%;
  height: 15px;
  background-color: #f3f4f5;
`;

const SettingCotainer = styled(TouchableOpacity)`
  margin: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SettingTitle = styled.Text`
  font-weight: 500;
  font-size: 17px;
`;
const SettingTitleRed = styled.Text`
  font-weight: 500;
  font-size: 17px;
  color: red;
`;
