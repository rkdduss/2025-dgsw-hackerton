import React, { useState } from 'react';
import * as S from '../../styles/pages/select-category';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { useRouter } from 'expo-router';

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

export default function SelectCategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (category: string) => {
    setSelected(category);
  };

  const handleDone = () => {
    // 선택된 카테고리를 이전 화면으로 전달하는 로직 (예: router.setParams)
    router.back();
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={() => router.back()}>{/* Add back icon */}</S.BackButton>
        <S.HeaderTitle>카테고리 선택</S.HeaderTitle>
      </S.Header>

      <S.CategoryList>
        {categories.map((category, index) => (
          <S.CategoryItem
            key={index}
            selected={selected === category}
            onPress={() => handleSelect(category)}
          >
            <S.CategoryText selected={selected === category}>
              {category}
            </S.CategoryText>
          </S.CategoryItem>
        ))}
      </S.CategoryList>

      <S.ButtonContainer>
        <PrimaryButton
          text="선택 완료"
          action={handleDone}
          disabled={!selected}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
