import React from 'react';
import * as S from '../../styles/pages/chat';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const chatRooms = [
  {
    id: '1',
    name: '김철수',
    lastMessage: '안녕하세요! 구인 글 보고 연락드립니다.',
    time: '오후 3:30',
  },
  {
    id: '2',
    name: '이영희',
    lastMessage: '정보처리산업기사 자격증 있으신가요?',
    time: '어제',
  },
  {
    id: '3',
    name: '박영수',
    lastMessage: '언제쯤 가능하신가요?',
    time: '2일 전',
  },
];

export default function ChatPage() {
  const router = useRouter();

  const handleChatPress = (chatId: string) => {
    // 채팅방 상세 화면으로 이동
    router.push(`/chat-detail?id=${chatId}`);
  };

  return (
    <S.Container>
     <SafeAreaView style={{width:"100%", height:"100%"}}>
      <S.Header>
          <S.HeaderTitle>채팅</S.HeaderTitle>
        </S.Header>
        <S.ChatList>
          {chatRooms.map((chat) => (
            <S.ChatItemContainer key={chat.id} onPress={() => handleChatPress(chat.id)}>
              <S.Avatar />
              <S.ChatContent>
                <S.ChatHeader>
                  <S.ChatName>{chat.name}</S.ChatName>
                  <S.ChatTime>{chat.time}</S.ChatTime>
                </S.ChatHeader>
                <S.LastMessage>{chat.lastMessage}</S.LastMessage>
              </S.ChatContent>
            </S.ChatItemContainer>
          ))}
        </S.ChatList>
     </SafeAreaView>
    </S.Container>
  );
}
