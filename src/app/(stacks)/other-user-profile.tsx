import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, ActivityIndicator, View, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { api } from "@/libs/api";
import { UserResponse } from "@/services/user.service";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { rotationHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler";
import { FlatList } from "react-native-gesture-handler";

export default function OtherUserProfilePage() {
  const { id } = useLocalSearchParams();


  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const [user, setUser] = useState<UserResponse | null>(null);
  useEffect(()=>{
    api.axiosInstance.get(`/users/${id}`)
      .then(res=>{
        setUser(res.data)
      })
      .catch(err=>{

      })
  },[id])
  const [loading, setLoading] = useState(true);
  const posts = [
    {
      id: "1",
      title: "휴대폰 반도 유보라3차 CU 앞에서 주웠어요",
      createdAt: "3일 전",
      image: true,
    },
    { id: "2", title: "요즘 모기 잘 안보이지 않나요?", createdAt: "7일 전" },
    { id: "3", title: "구지에 미용실 잘하는 곳 있나요?", createdAt: "12일 전" },
  ];

  useEffect(() => {
    if (id) {
      api.axiosInstance
        .get(`/users/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error("사용자 정보 불러오기 실패 😢", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#5457f7" />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Text>사용자 정보를 찾을 수 없어요</Text>
      </Container>
    );
  }
  const router = useRouter();
  return (
    <Container>
      <SafeAreaView>
        <Header>
          <Ionicons name="chevron-back" size={24} onPress={()=> {
            router.back();
          }} />
          <HeaderTitle>프로필</HeaderTitle>
        </Header>

        <UserSection>
          <ProfileImage source={require("@/assets/nomal-profile.png")} />
          <UserInfo>
            <Row>
              <UserName>{user.name}</UserName>
              <ChatButton onPress={()=>{
                router.push(`/(stacks)/chat-detail?id=${user.id}`)
              }}>
                <ChatButtonText>채팅하기</ChatButtonText>
              </ChatButton>
            </Row>
            {/* <UserJoinDate>{user.joinedAt}</UserJoinDate> */}
          </UserInfo>
        </UserSection>

        <StatsRow>
          <StatBox>
            <StatNumber>▲134</StatNumber>
            <StatLabel>누적 조회수</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>▲134</StatNumber>
            <StatLabel>작성글/댓글</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>▲134</StatNumber>
            <StatLabel>하트 수</StatLabel>
          </StatBox>
        </StatsRow>

        <TabRow>
          <TabButton
            active={activeTab === "posts"}
            onPress={() => setActiveTab("posts")}
          >
            <TabText active={activeTab === "posts"}>작성한 글</TabText>
          </TabButton>
          <TabButton
            active={activeTab === "comments"}
            onPress={() => setActiveTab("comments")}
          >
            <TabText active={activeTab === "comments"}>댓글</TabText>
          </TabButton>
        </TabRow>

        <Divider />

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <PostItem>
              <View style={{ flex: 1 }}>
                <PostTitle>{item.title}</PostTitle>
                <PostMeta>구지면 · {item.createdAt}</PostMeta>
              </View>
              {item.image && (
                <PostImage
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2023/01/04/06/31/smartphone-7694436_960_720.jpg",
                  }}
                />
              )}
            </PostItem>
          )}
        />
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`;

const UserSection = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

const UserInfo = styled.View`
  margin-left: 16px;
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ChatButton = styled.TouchableOpacity`
  background-color: #5457f7;
  border-radius: 10px;
  padding: 4px 8px;
  margin-left: 8px;
`;

const ChatButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserJoinDate = styled.Text`
  color: gray;
  font-size: 13px;
  margin-top: 4px;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
`;

const StatBox = styled.View`
  align-items: center;
`;

const StatNumber = styled.Text`
  color: #5457f7;
  font-weight: bold;
  font-size: 16px;
`;

const StatLabel = styled.Text`
  color: gray;
  font-size: 12px;
  margin-top: 4px;
`;

const TabRow = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.active ? "#000" : "transparent")};
  align-items: center;
`;

const TabText = styled.Text<{ active: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const Divider = styled.View`
  height: 1px;
  background-color: #ddd;
`;

const PostItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const PostTitle = styled.Text`
  font-size: 15px;
`;

const PostMeta = styled.Text`
  color: gray;
  font-size: 12px;
  margin-top: 4px;
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-left: 12px;
  border-radius: 8px;
`;
