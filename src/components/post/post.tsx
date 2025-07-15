import React from 'react';
import * as S from '../../styles/components/post';

interface PostProps {
  onPress: () => void;
}

export const Post = ({ onPress }: PostProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.PostImage />
      <S.PostContent>
        <S.PostTitle>아이폰 수리 맡겨봅니다</S.PostTitle>
        <S.PostInfo>시급 (오전 9시 ~ 오후 6시)</S.PostInfo>
        <S.PostPrice>34,000원</S.PostPrice>
      </S.PostContent>
    </S.Container>
  );
};
