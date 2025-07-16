import { SafeAreaView, ScrollView } from "react-native";
import * as S from "../../styles/pages/community";
import { PrimaryChip } from "@/components/chip/primary_chip";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CommunityBox } from "@/components/section/community-box";
import { fetchPosts } from "@/services/post";

export default function CommunityPage() {
  const chipList = ["최근 게시물", "인기 게시물", "제보 합니다!", "맛집"];
  const [selectedChip, setSelectedChip] = useState<string>("최근 게시물");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetchPosts();
        setPosts(res.data); // 받아온 게시글 저장
      } catch (err) {
        console.error("게시글 불러오기 실패 😢", err);
      }
    };

    loadPosts();
  }, []);
  return (
    <S.Container>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <S.Header>
          <S.HeaderTitle>커뮤니티</S.HeaderTitle>
          <AntDesign name="plus" size={26} color="#5457F7" />
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
        <ScrollView>
          <S.CommunityBoxListArea>
            {posts.map((post, idx) => (
              <CommunityBox
                key={idx}
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
