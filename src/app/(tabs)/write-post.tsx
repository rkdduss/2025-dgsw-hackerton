import React, { useState } from 'react';
import { View } from 'react-native';
import * as S from '../../styles/pages/write-post';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { useRouter } from 'expo-router';

export default function WritePostPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>글쓰기</S.HeaderTitle>
      </S.Header>
      <S.Form>
        <S.ImagePickerContainer>
          <S.ImagePicker>
            <S.ImagePickerText>1/10</S.ImagePickerText>
          </S.ImagePicker>
          {/* Map through selected images */}
        </S.ImagePickerContainer>

        <S.InputContainer>
          <S.InputLabel>제목</S.InputLabel>
          <S.TextInput placeholder="제목을 입력해주세요!" />
        </S.InputContainer>

        <S.InputContainer>
          <S.InputLabel>카테고리</S.InputLabel>
          <S.DropdownContainer onPress={() => router.push('/select-category')}>
            <S.DropdownText>{selectedCategory || '카테고리를 선택해 주세요'}</S.DropdownText>
            <S.DropdownIcon source={require('../../../assets/dismiss.png')} />
          </S.DropdownContainer>
        </S.InputContainer>

        <S.InputContainer>
          <S.InputLabel>자격증</S.InputLabel>
          <S.DropdownContainer onPress={() => router.push('/select-certificate')}>
            <S.DropdownText>{selectedCertificates.length > 0 ? selectedCertificates.join(', ') : '자격증을 선택해주세요!'}</S.DropdownText>
            <S.DropdownIcon source={require('../../../assets/dismiss.png')} />
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
      <S.ButtonContainer>
        <PrimaryButton text="작성" action={() => {}} />
      </S.ButtonContainer>
    </S.Container>
  );
}
