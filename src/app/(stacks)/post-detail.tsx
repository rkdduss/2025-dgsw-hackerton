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
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "@/libs/api";
import styled from "styled-components/native";
import normalProfile from '../../../assets/nomal-profile.png';
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useQuery } from '@tanstack/react-query';

// util: firebase timestamp to '몇 분 전', '몇 시간 전' 등
function getTimeAgo(createTime: { _seconds: number; _nanoseconds: number }) {
  if (!createTime || typeof createTime._seconds !== 'number') return '';
  const now = Date.now();
  const created = createTime._seconds * 1000 + Math.floor(createTime._nanoseconds / 1e6);
  const diffMs = now - created;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}초 전`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;
  const date = new Date(created);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

export default function PostDetailPage() {
  const { post } = useLocalSearchParams();
  const parsedPost = post ? JSON.parse(post as string) : null;

  const isJob = parsedPost?.isRecruitment ?? false;


  const [user, setUser] = useState<any>();
  const screenWidth = Dimensions.get("window").width;
  const [imageIndex, setImageIndex] = useState(0);
  const [heart, setHeart] = useState(false);
  const handleHeart = () => setHeart((prev) => !prev);

  // 내 user 정보 가져오기
  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.axiosInstance.get('/users/me');
      return res.data;
    },
  });

  if (!parsedPost) {
    return (
      <S.Container>
        <S.HeaderTitle>게시글이 존재하지 않아요!</S.HeaderTitle>
      </S.Container>
    );
  }

  useEffect(() => {
    console.log(parsedPost)
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

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <S.Container>
        <ScrollView>
          <S.Header>
            <S.BackButton onPress={()=>{
                router.dismiss();
              }}>
                <Entypo name="chevron-thin-left" size={22} color="black" />        
            </S.BackButton>
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
            <TouchableOpacity
              onPress={() => {
                console.log("");
                router.push({
                  pathname: "/other-user-profile",
                  params: { id: user.id },
                });
              }}
            >
              <Profile>
                <Image
                  source={require("@/assets/small-profile.png")}
                ></Image>
              </Profile>
            </TouchableOpacity>
            <S.UserTextContainer>
              <S.UserName>{user?.name}</S.UserName>

              <S.UserLocation>{user.location}</S.UserLocation>
            </S.UserTextContainer>
          </S.UserInfoContainer>

          <S.PostContentContainer>
            <S.PostTitle>{parsedPost.title}</S.PostTitle>
            <S.PostInfo>
              {isJob
                ? `고용 내역: 30명 • ${getTimeAgo(parsedPost.createTime)}`
                : `경력 3년 • ${getTimeAgo(parsedPost.createTime)}`}
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
            <S.Price>{Number(parsedPost.price).toLocaleString()}원</S.Price>
          </S.PriceContainer>

          <PrimaryButton text="채팅 하기" action={() => {
            if (!me?.id || !user?.id) return;
            const roomId = [me.id, user.id].sort().join('_');
            router.push(`/(stacks)/chat-detail?id=${roomId}`);
          }} style="small" />
        </S.BottomBarContainer>
      </S.BottomBar>
    </View>
  );
}

const Profile = styled.View`
  width: 45px;
  height: 45px;
  background-color: #5457f7;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;