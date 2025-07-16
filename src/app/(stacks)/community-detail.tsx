import { DismissButton } from "@/components/button/dismiss_button";
import { Post } from "@/components/post/post";
import { CommentBox } from "@/components/section/comment-box";
import { api } from "@/libs/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View, TextInput, Button, KeyboardAvoidingView, Platform, Image } from "react-native";
import styled from "styled-components/native";

interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  tag: string[];
  images: string[];
  likeCount: number;
  comments: any[]; 
  createTime: {
    _seconds: number;
    _nanoseconds: number;
  };
}

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


export default function CommunityDetailPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { id } = useLocalSearchParams();

  const [heart, setHeart] = useState(false);
  const handleHeart = () => {
    setHeart((prev) => !prev);
  };

  const [content, setContent] = useState<Post | null>(null);
  const [author, setAuthor] = useState<any>(null);
  const [commentInput, setCommentInput] = useState("");

  useEffect(()=> {
    api.axiosInstance.get("/board")
      .then((res)=>{
        res.data.forEach((data:Post) => {
          if (data.id == id){
            setContent(data);
            api.axiosInstance.get(`/users/${data.userId}`)
              .then((res)=>{
                setAuthor(res.data)
              }).catch(()=>{{
                console.log("불러오기실패")
              }})
        
            console.log(data)
          }
        });
      })
      .catch(err=>{
        console.log("로딩중 실패")
      })
  },[])

  if (!content) 
    return
  if (!author) 
    return
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Container>
        <SafeAreaView style={{ flex: 1 }}>
          <Header>
            <DismissButton />
            <HeaderText>커뮤니티</HeaderText>
          </Header>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            <ImageCarousel
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x /
                    e.nativeEvent.layoutMeasurement.width
                );
                setCurrentIndex(index);
              }}
              scrollEventThrottle={16}
            >
              {content.images.map((uri, i) => (
                <ImageItem key={i} source={{ uri: uri }} resizeMode="contain" />
              ))}
            </ImageCarousel>
            <IndicatorContainer>
              {content.images.map((_, i) => (
                <IndicatorDot key={i} active={i === currentIndex} />
              ))}
            </IndicatorContainer>
            <UserInfo>
              <UserProfileImage>
                <Image source={require("@/assets/small-profile.png")}/>
              </UserProfileImage>
              <UserInfoColumn>
                <Username>{author.name}</Username>
                <UserLocation>{author.location}</UserLocation>
              </UserInfoColumn>
            </UserInfo>
            <Title>{content.title}</Title>
            <Time>{getTimeAgo(content.createTime)}</Time>
            <Detail>
              {content.content}
            </Detail>

          </ScrollView>
        </SafeAreaView>

      </Container>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 0 20px;
`;

const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: "Pretendard-SemiBold";
`;

const ImageCarousel = styled.ScrollView`
  width: ${Dimensions.get("window").width}px;
  height: 362px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const ImageItem = styled.Image`
  width: ${Dimensions.get("window").width}px;
  height: 362px;
  background-color: #F3F4F5;
`;

const IndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const IndicatorDot = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#5457F7" : "#D9D9D9")};
  margin: 0 4px;
`;

//유저정보

const UserInfo = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;
const UserProfileImage = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: gray;
  margin-right: 10px;
`;

const UserInfoColumn = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
`;
const Username = styled.Text`
  font-size: 17px;
  font-weight: 700;
  font-family: "Pretendard-Bold";
`;
const UserLocation = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textgray};
  font-family: "Pretendard-SemiBold";
`;

//내용부분

const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: black;
  margin-bottom: 3px;
  font-family: 'Pretendard-Bold';
`;
const Time = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
  margin-bottom: 15px;
  font-family: 'Pretendard-Regular';
`;
const Detail = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #141414;
  margin-bottom: 25px;
  font-family: 'Pretendard-Regular';
`;

const CommentCount = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #5457f7;
  margin-bottom: 20px;
  font-family: "Pretendard-Bold";
`;

const CommentInputRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding: 10px 0 30px 0;
`;

const CommentTextInput = styled.TextInput`
  flex: 1;
  min-height: 40px;
  max-height: 100px;
  background-color: #f3f4f5;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 15px;
  margin-right: 10px;
`;

const CommentSubmitButton = styled.TouchableOpacity`
  background-color: #5457f7;
  padding: 10px 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const CommentSubmitText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: "Pretendard-SemiBold";
`;

const CommentInputRowFixed = styled.View`
  flex-direction: row;
  align-items: flex-end;
  padding: 10px 0 30px 0;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 20px;
  padding-right: 20px;
  border-top-width: 1px;
  border-top-color: #f3f4f5;
`;
