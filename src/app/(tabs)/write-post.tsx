import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import * as S from '../../styles/pages/write-post';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { useRouter, useLocalSearchParams } from 'expo-router';

import Entypo from '@expo/vector-icons/Entypo';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import ImageViewing from 'react-native-image-viewing';


const categories = [
  '구인',
  '구직',
  '아르바이트',
  '단기알바',
  '프리랜서',
  '외주',
  '채용',
  '재택알바',
];

export default function WritePostPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [isPickerShow, setPickerShow] = useState(false)

  // 이미지 미리보기 모달 state
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // 이미지 클릭 핸들러
  const handlePreview = (idx: number) => {
    setPreviewIndex(idx);
    setPreviewVisible(true);
  };

  // certificates param이 변경될 때만 state 갱신 (무한루프 방지)
  React.useEffect(() => {
    let newCertificates: string[] = [];
    if (params.certificates) {
      if (Array.isArray(params.certificates)) {
        newCertificates = params.certificates as string[];
      } else if (typeof params.certificates === 'string') {
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
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('이미지 접근 권한이 필요합니다.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 10 - images.length, // 남은 개수만큼만 선택 가능
    });
    if (!result.canceled && result.assets) {
      const uris = result.assets.map(asset => asset.uri).filter(Boolean);
      setImages(prev => [...prev, ...uris].slice(0, 10));
    }
  };

  // 이미지 삭제 함수
  const handleRemoveImage = (idx: number) => {
    Alert.alert(
      "이미지 삭제",
      "정말로 이미지를 지우시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: () => {
          setImages(prev => prev.filter((_, i) => i !== idx));
        }},
      ]
    );
  };

  // DraggableFlatList용 렌더 함수
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
            width: '100%',
            height: '100%',
            borderRadius: 8,
            overflow: 'hidden',
            position: 'relative', // 반드시 필요함
          }}
        >
          {/* 이미지 */}
          <Image
            source={{ uri: item }}
            style={{
              width: '100%',
              height: '100%',
              opacity: isActive ? 0.7 : 1,
            }}
          />
  
          {/* 삭제 버튼 */}
          <TouchableOpacity
            onPress={() => handleRemoveImage(idx)}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
              alignItems: 'center',
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
              <View style={{ width: '100%' }}>
                <DraggableFlatList
                  data={images}
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  onDragEnd={({ data }) => setImages(data)}
                  keyExtractor={(item) => item}
                  renderItem={renderImageItem}
                  style={{ height: 80 }}
                  contentContainerStyle={{ flexDirection: 'row' }}
                  ListHeaderComponent={
                    <S.ImagePicker onPress={pickImage} style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
                      <Entypo name="camera" size={22} color="#d1d5db"></Entypo>
                      <S.ImagePickerText>{images.length}/10</S.ImagePickerText>
                    </S.ImagePicker>
                  }
                  
                />
                <ImageViewing
                  images={images.map(uri => ({ uri }))}
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
              <S.DropdownContainer  onPress={() => setPickerShow(!isPickerShow)}>
                <S.DropdownText>{selectedCategory || '카테고리를 선택해 주세요'}</S.DropdownText>
                <Entypo name={isPickerShow ? "chevron-small-down" : "chevron-small-down"} size={24} color="#7D848A"/>
              </S.DropdownContainer>
            </S.InputContainer>
            
            {isPickerShow && <PickerContainer>
              {categories.map((data)=> (
                <PickerContent background={data == selectedCategory ? "#f4f4f4": "white"} key={data} onPress={()=>{
                  setSelectedCategory(data)
                  setPickerShow(false)
                }}>
                  <PickerText>
                    {data}
                  </PickerText>
                </PickerContent>
              ))}
            </PickerContainer>}

            <S.InputContainer>
              <S.InputLabel>자격증</S.InputLabel>
              <S.DropdownContainer onPress={() => router.push('/select-certificate')}>
                <S.DropdownText>{selectedCertificates.length > 0 ? selectedCertificates.join(', ') : '자격증을 선택해주세요!'}</S.DropdownText>
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
          <PrimaryButton text="작성" action={() => {}} />
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
`

const PickerContent = styled(TouchableOpacity)<{background:string}>`
  height: 48px;
  width: 100%;
  background-color: ${(props)=>props.background};
  justify-content: center;
`

const PickerText = styled.Text`
  color: black;
  margin-left: 20px;
`