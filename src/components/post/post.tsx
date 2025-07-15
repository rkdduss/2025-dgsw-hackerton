import React from "react";
import * as S from "../../styles/components/post";

interface PostProps {
  uid: string;
  title: string;
  images: string[];
  onPress: () => void;
}

export const Post = ({ uid, title, images, onPress }: PostProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.PostImage source={{uri:images[0]}}/>
      <S.PostContent>
        <S.PostTitle>{title}</S.PostTitle>
        <S.PostInfo>시급 (오전 9시 ~ 오후 6시)</S.PostInfo>
        <S.PostPrice>34,000원</S.PostPrice>
      </S.PostContent>
    </S.Container>
  );
};
