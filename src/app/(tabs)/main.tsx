import { useQuery } from '@tanstack/react-query';
import { ScrollView, RefreshControl, Text } from 'react-native';
import * as S from "../../styles/pages/main";
import { Post } from "../../components/post/post";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { PostResponse, fetchPosts } from "@/services/post";

const categories = [
  { name: "구인", icon: require("@/assets/icons/icon_1.png") },
  { name: "구직", icon: require("@/assets/icons/icon_2.png") },
  { name: "아르바이트", icon: require("@/assets/icons/icon_3.png") },
  { name: "단기 알바", icon: require("@/assets/icons/icon_4.png") },
  { name: "프리랜서", icon: require("@/assets/icons/icon_5.png") },
  { name: "외주", icon: require("@/assets/icons/icon_6.png") },
  { name: "채용", icon: require("@/assets/icons/icon_7.png") },
  { name: "재택알바", icon: require("@/assets/icons/icon_8.png") },
];

const filters = ["공고 중", "내 보유 자격증", "임금 높은 순", "리뷰 많은 순"];

export default function MainPage() {
  const [activeFilter, setActiveFilter] = useState("내 보유 자격증");
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery<PostResponse[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetchPosts();
      return res.data;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handlePostPress = (post: PostResponse) => {
    router.push({
      pathname: "/post-detail",
      params: { post: JSON.stringify(post) },
    });
  };

  return (
    <S.Container>
      <S.Header>
        <S.LocationContainer>
          <S.LocationText>구지면</S.LocationText>
        </S.LocationContainer>
        <S.SearchContainer>
          <S.SearchInput placeholder="검색어를 입력해주세요" />
          <Feather name="search" size={22} color="black" />
        </S.SearchContainer>
      </S.Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      <S.CategoryContainer>
        {categories.slice(0, 4).map((category, index) => (
          <S.CategoryItem key={index}>
            <S.CategoryIconContainer>
              <S.CategoryIconImage source={category.icon}/>
            </S.CategoryIconContainer>
            <S.CategoryText>{category.name}</S.CategoryText>
          </S.CategoryItem>
        ))}
      </S.CategoryContainer>
      <S.CategoryContainerLast>
        {categories.slice(4).map((category, index) => (
          <S.CategoryItem key={index}>
            <S.CategoryIconContainer>
              <S.CategoryIconImage source={category.icon}/>
            </S.CategoryIconContainer>
            <S.CategoryText>{category.name}</S.CategoryText>
          </S.CategoryItem>
        ))}
      </S.CategoryContainerLast>
      <S.Divider />
      <S.FilterContainer horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => (
          <S.FilterButton
            key={index}
            active={filter === activeFilter}
            onPress={() => setActiveFilter(filter)}
          >
            <S.FilterText active={filter === activeFilter}>
              {filter}
            </S.FilterText>
          </S.FilterButton>
        ))}
      </S.FilterContainer>

        <S.PostListContainer>
          {isLoading ? (
            <Text style={{textAlign:'center',marginTop:40}}>로딩중...</Text>
          ) : posts.length === 0 ? (
            <Text style={{textAlign:'center',marginTop:40}}>게시글이 없습니다</Text>
          ) : (
            posts.map((post: PostResponse, idx: number) => (
              <Post
                key={post.id}
                uid={post.userId}
                title={post.title}
                images={post.images}
                onPress={() => handlePostPress(post)}
              />
            ))
          )}
        </S.PostListContainer>
      </ScrollView>
    </S.Container>
  );
}