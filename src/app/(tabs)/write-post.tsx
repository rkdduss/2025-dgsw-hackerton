import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as S from "../../styles/pages/write-post";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { uploadPost } from "@/services/post";

const categories = [
  "구인",
  "구직",
  "아르바이트",
  "단기알바",
  "프리랜서",
  "외주",
  "채용",
  "재택알바",
];

export default function WritePostPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [isPickerShow, setPickerShow] = useState(false);

  useEffect(() => {
    let newCertificates: string[] = [];
    if (params.certificates) {
      if (Array.isArray(params.certificates)) {
        newCertificates = params.certificates as string[];
      } else if (typeof params.certificates === "string") {
        newCertificates = [params.certificates];
      }
    }
    if (
      newCertificates.length > 0 &&
      (selectedCertificates.length !== newCertificates.length ||
        !selectedCertificates.every((v, i) => v === newCertificates[i]))
    ) {
      setSelectedCertificates(newCertificates);
    }
  }, [params.certificates]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("⚠️ 제목 누락", "제목을 입력해주세요!");
      return;
    }
    if (!content.trim()) {
      Alert.alert("⚠️ 내용 누락", "내용을 입력해주세요!");
      return;
    }
    if (!selectedCategory) {
      Alert.alert("⚠️ 카테고리 누락", "카테고리를 선택해주세요!");
      return;
    }
    if (selectedCertificates.length === 0) {
      Alert.alert("⚠️ 자격증 누락", "자격증을 하나 이상 선택해주세요!");
      return;
    }

    try {
      const postPayload = {
        userId: "HgfMP1DaFiYzo4CpPSjW7rhRoV23",
        title,
        content,
        images: [],
        isRecruitment: selectedCategory === "구인",
        type: selectedCategory ?? "기타",
        certificates: selectedCertificates,
      };

      const postRes = await uploadPost(postPayload);

      Alert.alert("✅ 게시글 등록 완료", "게시글이 성공적으로 등록되었어요!");
      router.replace("/community");
    } catch (error: any) {
      Alert.alert(
        "⚠️ 등록 실패",
        error.response?.data?.message || "알 수 없는 오류가 발생했어요"
      );
      console.error("🚨 등록 실패", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <S.Container>
        <SafeAreaView style={{ flex: 1 }}>
          <S.Header>
            <S.HeaderTitle>글쓰기</S.HeaderTitle>
          </S.Header>

          <S.Form>
            <S.InputContainer>
              <S.InputLabel>제목</S.InputLabel>
              <S.TextInput
                value={title}
                onChangeText={setTitle}
                autoCapitalize="none"
                placeholder="제목을 입력해주세요!"
              />
            </S.InputContainer>

            <S.InputContainer>
              <S.InputLabel>카테고리</S.InputLabel>
              <S.DropdownContainer onPress={() => setPickerShow(!isPickerShow)}>
                <S.DropdownText>
                  {selectedCategory || "카테고리를 선택해 주세요"}
                </S.DropdownText>
                <Entypo name="chevron-small-down" size={24} color="#7D848A" />
              </S.DropdownContainer>
            </S.InputContainer>

            {isPickerShow && (
              <PickerContainer>
                {categories.map((data) => (
                  <PickerContent
                    background={data === selectedCategory ? "#f4f4f4" : "white"}
                    key={data}
                    onPress={() => {
                      setSelectedCategory(data);
                      setPickerShow(false);
                    }}
                  >
                    <PickerText>{data}</PickerText>
                  </PickerContent>
                ))}
              </PickerContainer>
            )}

            <S.InputContainer>
              <S.InputLabel>자격증</S.InputLabel>
              <S.DropdownContainer
                onPress={() => router.push("/select-certificate")}
              >
                <S.DropdownText>
                  {selectedCertificates.length > 0
                    ? selectedCertificates.join(", ")
                    : "자격증을 선택해주세요!"}
                </S.DropdownText>
                <Entypo name="chevron-small-right" size={24} color="#7D848A" />
              </S.DropdownContainer>
            </S.InputContainer>

            <S.InputContainer>
              <S.InputLabel>내용</S.InputLabel>
              <S.TextArea
                value={content}
                onChangeText={setContent}
                autoCapitalize="none"
                placeholder="내용을 작성해주세요!"
                multiline
                textAlignVertical="top"
              />
            </S.InputContainer>
          </S.Form>
        </SafeAreaView>

        <S.ButtonContainer>
          <PrimaryButton text="작성" action={handleSubmit} />
        </S.ButtonContainer>
      </S.Container>
    </KeyboardAvoidingView>
  );
}

const PickerContainer = styled.ScrollView`
  width: 100%;
  height: 240px;
  margin-top: -20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const PickerContent = styled(TouchableOpacity)<{ background: string }>`
  height: 48px;
  width: 100%;
  background-color: ${(props) => props.background};
  justify-content: center;
`;

const PickerText = styled.Text`
  color: black;
  margin-left: 20px;
`;
