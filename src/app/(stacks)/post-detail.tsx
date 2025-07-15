import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import * as S from "../../styles/pages/post-detail";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { DismissButton } from "@/components/button/dismiss_button";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { api } from "@/libs/api";

export default function PostDetailPage() {
  const { post } = useLocalSearchParams();
  const parsedPost = post ? JSON.parse(post as string) : null;

  const isJob = parsedPost?.isRecruitment ?? false;

  const [heart, setHeart] = useState(false);
  const handleHeart = () => setHeart((prev) => !prev);

  const [user, setUser] = useState<any>();
  const screenWidth = Dimensions.get("window").width;
  const [imageIndex, setImageIndex] = useState(0);

  if (!parsedPost) {
    return (
      <S.Container>
        <S.HeaderTitle>게시글이 존재하지 않아요!</S.HeaderTitle>
      </S.Container>
    );
  }

  useEffect(() => {
    api.axiosInstance
      .get(`/users/${parsedPost.userId}`)
      .then((res: any) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <View style={{ flex: 1 }}>
      <S.Container>
        <ScrollView>
          <S.Header>
            <DismissButton />
            <S.HeaderTitle>{parsedPost.type}</S.HeaderTitle>
          </S.Header>

          <S.ImageContainer>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const index = Math.floor(
                  e.nativeEvent.contentOffset.x / screenWidth + 0.5
                );
                setImageIndex(index);
              }}
              scrollEventThrottle={16}
              contentContainerStyle={{
                alignItems:"center",
              }}
            >
              {parsedPost.images?.map((img: string, idx: number) => (
                <View key={idx} style={{backgroundColor:"black"}}>
                  <Image
                    source={{ uri: img }}
                    style={{
                      width: screenWidth,
                      height:260,
                      resizeMode: "cover",
                    }}
                  />  
                </View>
                
              ))}
            </ScrollView>

            {/* 인디케이터 */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                position:"absolute",
                bottom:20,
                width:"100%"
              }}
            >
              {parsedPost.images?.map((_: string, idx: number) => (
                <View
                  key={idx}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: idx === imageIndex ? "#5457F7" : "#ccc",
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
          </S.ImageContainer>

          <S.UserInfoContainer>
            <S.Avatar />
            <S.UserTextContainer>
              <S.UserName>{user?.name}</S.UserName>

              <S.UserLocation>{user.location}</S.UserLocation>
            </S.UserTextContainer>
          </S.UserInfoContainer>

          <S.PostContentContainer>
            <S.PostTitle>{parsedPost.title}</S.PostTitle>
            <S.PostInfo>
              {isJob ? "고용 내역: 30명 • 1시간 전" : "경력 3년 • 1시간 전"}
            </S.PostInfo>
            <S.PostDescription>{parsedPost.content}</S.PostDescription>
          </S.PostContentContainer>

          <S.Section>
            <S.SectionTitle>{isJob ? "필요 자격" : "보유 자격"}</S.SectionTitle>
            <S.TagContainer>
              {parsedPost.certificates.map((cert: string, idx: number) => (
                <S.Tag key={idx} active={idx === 0}>
                  <S.TagText active={idx === 0}>{cert}</S.TagText>
                </S.Tag>
              ))}
            </S.TagContainer>
          </S.Section>
        </ScrollView>
      </S.Container>
      <S.BottomBar>
        <S.BottomBarContainer>
          <TouchableOpacity onPress={handleHeart} activeOpacity={0.7}>
            <Ionicons
              name={heart ? "heart-sharp" : "heart-outline"}
              size={24}
              color={heart ? "#5457F7" : "#A0A0A0"}
            />
          </TouchableOpacity>
          <S.PriceContainer>
            <S.PriceLabel>시급 (오전 9시 ~ 오후 6시)</S.PriceLabel>
            <S.Price>{isJob ? "34,000원" : "12,000원"}</S.Price>
          </S.PriceContainer>
          <PrimaryButton text="채팅 하기" action={() => {
            router.push(`/(stacks)/chat-detail?id=${user.id}`)
          }} style="small" />
        </S.BottomBarContainer>
      </S.BottomBar>
    </View>
  );
}