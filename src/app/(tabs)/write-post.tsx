import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import * as S from "../../styles/pages/write-post";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { useRouter, useLocalSearchParams } from "expo-router";

import Entypo from "@expo/vector-icons/Entypo";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import ImageViewing from "react-native-image-viewing";
import * as FileSystem from "expo-file-system";
import { api } from "@/api/api";

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
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>(
    []
  );

  const getFileExtension = (uri: string): string => {
    try {
      const cleanUri = uri.split("?")[0]; // 쿼리스트링 제거
      const extMatch = cleanUri.match(/\.(\w+)$/);
      return extMatch ? extMatch[1].toLowerCase() : "jpg"; // 못 찾으면 jpg로 fallback
    } catch {
      return "jpg";
    }
  };
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      images.forEach((uri, index) => {
        const ext = getFileExtension(uri);
        const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  
        formData.append("files", {
          uri,
          name: `image_${index}.${ext}`,
          type: mimeType,
        } as any); // RN 환경에선 이 캐스팅 필요!
      });
  
      const response = await api.axiosInstance.post("/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      Alert.alert("✅ 업로드 성공", "이미지가 성공적으로 업로드되었어요!");
      console.log("업로드 결과:", response.data);
    } catch (error: any) {
      Alert.alert(
        "⚠️ 업로드 실패",
        error.response?.data?.message || "알 수 없는 오류가 발생했어요"
      );
      console.error("업로드 실패", error);
    }
  };
  
  const [isPickerShow, setPickerShow] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const handlePreview = (idx: number) => {
    setPreviewIndex(idx);
    setPreviewVisible(true);
  };
  React.useEffect(() => {
    let newCertificates: string[] = [];
    if (params.certificates) {
      if (Array.isArray(params.certificates)) {
        newCertificates = params.certificates as string[];
      } else if (typeof params.certificates === "string") {
        newCertificates = [params.certificates];
      }
    }
    // 값이 다를 때만 setState
    if (
      newCertificates.length > 0 &&
      (selectedCertificates.length !== newCertificates.length ||
        !selectedCertificates.every((v, i) => v === newCertificates[i]))
    ) {
      setSelectedCertificates(newCertificates);
    }
  }, [params.certificates]);

  // 이미지 선택 함수
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("이미지 접근 권한이 필요합니다.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 10 - images.length, // 남은 개수만큼만 선택 가능
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((asset) => asset.uri).filter(Boolean);
      setImages((prev) => [...prev, ...uris].slice(0, 10));
    }
  };

  // 이미지 삭제 함수
  const handleRemoveImage = (idx: number) => {
    Alert.alert("이미지 삭제", "정말로 이미지를 지우시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          setImages((prev) => prev.filter((_, i) => i !== idx));
        },
      },
    ]);
  };

  // DraggableFlatList용 렌더 함수
  const renderImageItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<string>) => {
    const idx = images.indexOf(item);

    return (
      <View style={{ width: 80, height: 80, marginRight: 8 }}>
        <TouchableOpacity
          onLongPress={drag}
          onPress={() => handlePreview(idx)}
          disabled={isActive}
          activeOpacity={0.8}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            overflow: "hidden",
            position: "relative", // 반드시 필요함
          }}
        >
          {/* 이미지 */}
          <Image
            source={{ uri: item }}
            style={{
              width: "100%",
              height: "100%",
              opacity: isActive ? 0.7 : 1,
            }}
          />

          {/* 삭제 버튼 */}
          <TouchableOpacity
            onPress={() => handleRemoveImage(idx)}
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Entypo name="cross" size={12} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
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
            <S.ImagePickerContainer>
              {/* 이미지 미리보기 */}
              <View style={{ width: "100%" }}>
                <DraggableFlatList
                  data={images}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  onDragEnd={({ data }) => setImages(data)}
                  keyExtractor={(item) => item}
                  renderItem={renderImageItem}
                  style={{ height: 80 }}
                  contentContainerStyle={{ flexDirection: "row" }}
                  ListHeaderComponent={
                    <S.ImagePicker
                      onPress={pickImage}
                      style={{
                        width: 80,
                        height: 80,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Entypo name="camera" size={22} color="#d1d5db"></Entypo>
                      <S.ImagePickerText>{images.length}/10</S.ImagePickerText>
                    </S.ImagePicker>
                  }
                />
                <ImageViewing
                  images={images.map((uri) => ({ uri }))}
                  imageIndex={previewIndex}
                  visible={previewVisible}
                  onRequestClose={() => setPreviewVisible(false)}
                  swipeToCloseEnabled={true}
                  doubleTapToZoomEnabled={true}
                />
              </View>
            </S.ImagePickerContainer>

            <S.InputContainer>
              <S.InputLabel>제목</S.InputLabel>
              <S.TextInput placeholder="제목을 입력해주세요!" />
            </S.InputContainer>

            <S.InputContainer>
              <S.InputLabel>카테고리</S.InputLabel>
              <S.DropdownContainer onPress={() => setPickerShow(!isPickerShow)}>
                <S.DropdownText>
                  {selectedCategory || "카테고리를 선택해 주세요"}
                </S.DropdownText>
                <Entypo
                  name={
                    isPickerShow ? "chevron-small-down" : "chevron-small-down"
                  }
                  size={24}
                  color="#7D848A"
                />
              </S.DropdownContainer>
            </S.InputContainer>

            {isPickerShow && (
              <PickerContainer>
                {categories.map((data) => (
                  <PickerContent
                    background={data == selectedCategory ? "#f4f4f4" : "white"}
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
