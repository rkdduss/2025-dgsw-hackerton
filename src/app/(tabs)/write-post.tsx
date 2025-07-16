import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import * as S from "../../styles/pages/write-post";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { useRouter, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import ImageViewing from "react-native-image-viewing";
import { uploadPost } from "@/services/post";
import axios, { Axios } from "axios";
import { api } from "@/libs/api";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SecondaryButton } from "@/components/button/SecondaryButton";

const categories = [
  "전체",
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
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [isPickerShow, setPickerShow] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [buttonCategory, setButtonCategory] = useState<'구인' | '구직' | null>(null);

  const getFileExtension = (uri: string): string => {
    try {
      const cleanUri = uri.split("?")[0];
      const extMatch = cleanUri.match(/\.(\w+)$/);
      return extMatch ? extMatch[1].toLowerCase() : "jpg";
    } catch {
      return "jpg";
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("이미지 접근 권한이 필요합니다.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 10 - images.length,
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map((asset) => asset.uri).filter(Boolean);
      setImages((prev) => [...prev, ...uris].slice(0, 10));
    }
  };

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

  const handlePreview = (idx: number) => {
    setPreviewIndex(idx);
    setPreviewVisible(true);
  };

  const renderImageItem = ({ item, drag, isActive }: RenderItemParams<string>) => {
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
            position: "relative",
          }}
        >
          <Image
            source={{ uri: item }}
            style={{ width: "100%", height: "100%", opacity: isActive ? 0.7 : 1 }}
          />
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

  useEffect(() => {
    if (selectedCategory === '구인' || selectedCategory === '구직') {
      setButtonCategory(selectedCategory);
    } else {
      setButtonCategory(null);
    }
  }, [selectedCategory]);

  // 게시글 등록 뮤테이션
  const postMutation = useMutation({
    mutationFn: async (postPayload: any) => {
      await uploadPost(postPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.replace("/main");
    },
    onError: (error: any) => {
      Alert.alert(
        "⚠️ 등록 실패",
        error?.response?.data?.message || "알 수 없는 오류가 발생했어요"
      );
      if (axios.isAxiosError(error)) {
        console.log(error.response)
      }
    }
  });

  // handleSubmit은 postMutation.mutate로 대체
  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("⚠️ 제목 누락", "제목을 입력해주세요!");
      return;
    }
    if (!content.trim()) {
      Alert.alert("⚠️ 내용 누락", "내용을 입력해주세요!");
      return;
    }
    if (!price.trim()) {
      Alert.alert("⚠️ 내용 누락", "금액을 입력해주세요!");
      return;
    }
    if (!buttonCategory) {
      Alert.alert("⚠️ 구인/구직 선택", "구인 또는 구직을 선택해주세요!");
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
      const formData = new FormData();
      images.forEach((uri, index) => {
        const ext = getFileExtension(uri);
        const mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;
        formData.append("files", {
          uri,
          name: `image_${index}.${ext}`,
          type: mimeType,
        } as any);
      });
      const imageRes = await api.axiosInstance.post("/post/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await api.axiosInstance.get("/users/me");
      console.log(imageRes.data)
      console.log(res.data)
      console.log('buttonCategory:', buttonCategory); // 상태 추적용
      const postPayload = {
        userId: res.data.id,
        title,
        content,
        price:Number(price),
        images: imageRes.data,
        isRecruitment: selectedCategory === '구인',
        type: selectedCategory ?? "기타",
        certificates: selectedCertificates,
      };
      postMutation.mutate(postPayload);
    } catch (error: any) {
      console.log(error)
      Alert.alert(
        "⚠️ 등록 실패",
        error?.response?.data?.message || "알 수 없는 오류가 발생했어요"
      );
      if (axios.isAxiosError(error)) {
        console.log(error.response)
      }
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
            <S.ImagePickerContainer>
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
                      <Entypo name="camera" size={22} color="#d1d5db" />
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
            <S.TwoButtonContainer>
              {buttonCategory === '구인' ? (
                <>
                  <PrimaryButton
                    text="구인"
                    action={() => setButtonCategory('구인')}
                    style="medium"
                    
                  />
                  <SecondaryButton
                    text="구직"
                    action={() => setButtonCategory('구직')}
                    style="medium"
                  />
                </>
              ) : buttonCategory === '구직' ? (
                <>
                  <SecondaryButton
                    text="구인"
                    action={() => setButtonCategory('구인')}
                    style="medium"
                  />
                  <PrimaryButton
                    text="구직"
                    action={() => setButtonCategory('구직')}
                    style="medium"
                    
                  />
                </>
              ) : (
                <>
                  <SecondaryButton
                    text="구인"
                    action={() => setButtonCategory('구인')}
                    style="medium"
                  />
                  <SecondaryButton
                    text="구직"
                    action={() => setButtonCategory('구직')}
                    style="medium"
                  />
                </>
              )}
            </S.TwoButtonContainer>

            <S.InputContainer>
              <S.InputLabel>제목</S.InputLabel>
              <S.TextInput
                value={title}
                onChangeText={setTitle}
                autoCapitalize="none"
                placeholder="제목을 입력해주세요"
              />
            </S.InputContainer>
            {buttonCategory && (
              <S.InputContainer>
                <S.InputLabel>{buttonCategory == "구인" ? "금액" : "희망 금액"}</S.InputLabel>
                <S.TextInput
                  keyboardType="number-pad"
                  value={String(price)}
                  onChangeText={(e) => {setPrice(e)}}
                  autoCapitalize="none"
                  placeholder="금액을 입력해주세요"
                />
              </S.InputContainer>
            )

            }
            <S.InputContainer>
              <S.InputLabel>카테고리</S.InputLabel>
              <S.DropdownContainer onPress={() => setPickerShow(!isPickerShow)}>
                <S.DropdownText>
                  {selectedCategory || "카테고리를 선택해 주세요"}
                </S.DropdownText>
                <Entypo name={isPickerShow ? "chevron-small-up" : "chevron-small-down"} size={24} color="#7D848A" />
              </S.DropdownContainer>
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
                      <PickerText 
                        selected={data === selectedCategory}
                      >{data}</PickerText>
                    </PickerContent>
                  ))}
                </PickerContainer>
              )}
            </S.InputContainer>

            

            <S.InputContainer>
              <S.InputLabel>자격증</S.InputLabel>
              <S.DropdownContainer onPress={() => router.push("/select-certificate")}>
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
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 240px;
  margin-top: 80px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

const PickerContent = styled(TouchableOpacity)<{ background: string }>`
  height: 56px;
  width: 100%;
  background-color: ${(props) => props.background};
  justify-content: center;
`;

const PickerText = styled.Text<{selected: boolean}>`
  color: ${(props) => props.selected ? "#5457F7" : "black"};
  font-weight: ${(props) => props.selected ? "600" : "500"};
  font-size: 15px;
  margin-left: 20px;
`;