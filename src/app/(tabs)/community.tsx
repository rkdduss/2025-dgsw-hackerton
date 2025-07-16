import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import * as S from "../../styles/pages/community";
import { PrimaryChip } from "@/components/chip/primary_chip";
import { AntDesign } from "@expo/vector-icons";
import { CommunityBox } from "@/components/section/community-box";
import { fetchPosts } from "@/services/post";
import { useRouter } from "expo-router";
import { fetchBoards } from "@/services/board";
import { useQuery } from '@tanstack/react-query';

export default function CommunityPage() {
  const chipList = ["최근 게시물", "인기 게시물", "제보 합니다!", "맛집"];
  const [selectedChip, setSelectedChip] = useState<string>("최근 게시물");

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["community-boards"],
    queryFn: fetchBoards,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const router = useRouter();

  return (
    <S.Container>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <S.Header>
          <S.HeaderTitle>커뮤니티</S.HeaderTitle>
          <AntDesign
            name="plus"
            size={26}
            color="#5457F7"
            onPress={() => {
              router.push("/community-upload");
            }}
          />
        </S.Header>

        <S.FilterSelectContainer>
          <S.ChipRow horizontal>
            {chipList.map((chip) => (
              <S.ChipWrapper key={chip} onPress={() => setSelectedChip(chip)}>
                <PrimaryChip chipText={chip} active={selectedChip === chip} />
              </S.ChipWrapper>
            ))}
          </S.ChipRow>
        </S.FilterSelectContainer>
        <S.Divider />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <S.CommunityBoxListArea>
            {isLoading && <S.EmptyText>로딩 중...</S.EmptyText>}
            {isError && <S.EmptyText>에러 발생: {error?.message || '불러오기 실패'}</S.EmptyText>}
            {posts && posts.length === 0 && <S.EmptyText>게시글이 없습니다.</S.EmptyText>}
            {posts && (posts as any[]).map((post: any, idx: number) => (
              <CommunityBox
                key={idx}
                id={post.id}
                title={post.title}
                detail={post.content}
                thumbnail={post.images?.[0]}
              />
            ))}
          </S.CommunityBoxListArea>
        </ScrollView>
      </SafeAreaView>
    </S.Container>
  );
}
