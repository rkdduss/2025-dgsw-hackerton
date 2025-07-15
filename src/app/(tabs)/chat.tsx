import React, { useEffect, useState } from 'react';
import * as S from '../../styles/pages/chat';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '@/libs/api';
import { getMyChatRooms, ChatRoom } from '@/services/chat.service';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  profile?: string;
}

export default function ChatPage() {
  const router = useRouter();
  // user, chatRooms, userMap, loading 상태 제거
  const [userMap, setUserMap] = useState<{ [id: string]: User }>({});

  // 유저 정보 쿼리
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.axiosInstance.get('/users/me');
      return res.data;
    },
  });

  // 채팅방 목록 쿼리 (user가 있을 때만 enabled)
  const {
    data: chatRooms = [],
    isLoading: chatRoomsLoading,
    error: chatRoomsError,
  } = useQuery({
    queryKey: ['chatRooms', user?.id],
    queryFn: () => {
      if (!user?.id) return Promise.resolve([]); // user가 없으면 빈 배열 반환
      return getMyChatRooms(user.id);
    },
    enabled: !!user?.id,
  });

  // 유저 정보 캐싱 fetch (userMap은 그대로 사용)
  const fetchUser = async (id: string) => {
    if (userMap[id]) return userMap[id];
    try {
      const res = await api.axiosInstance.get(`/users/${id}`);
      setUserMap((prev) => ({ ...prev, [id]: res.data }));
      return res.data;
    } catch (e) {
      setUserMap((prev) => ({ ...prev, [id]: { id, name: '탈퇴한 유저' } }));
      console.log('[chat] 상대방 정보 fetch 실패', id, e);
      return { id, name: '탈퇴한 유저' };
    }
  };

  // 상대방 정보 미리 fetch (chatRooms 변경 시)
  useEffect(() => {
    if (!user?.id || !chatRooms.length) return;
    (async () => {
      for (const room of chatRooms) {
        const otherId = room.users.find((uid) => uid !== user.id);
        if (otherId) await fetchUser(otherId);
      }
    })();
  }, [chatRooms, user?.id]);

  if (userLoading || chatRoomsLoading) return <S.Container><S.HeaderTitle>로딩중...</S.HeaderTitle></S.Container>;
  if (userError || chatRoomsError) return <S.Container><S.HeaderTitle>에러 발생</S.HeaderTitle></S.Container>;

  return (
    <S.Container>
      <SafeAreaView style={{width:"100%", height:"100%"}}>
        <S.Header>
          <S.HeaderTitle>채팅</S.HeaderTitle>
        </S.Header>
        <S.ChatList>
          {Array.isArray(chatRooms) && chatRooms.length === 0 && (
            <S.HeaderTitle>채팅방이 없습니다</S.HeaderTitle>
          )}
          {Array.isArray(chatRooms) &&
            chatRooms.map((chat: any) => {
              const otherId = Array.isArray(chat.users)
                ? chat.users.find((uid: string) => uid !== user?.id)
                : undefined;
              const other = otherId ? userMap[otherId] : undefined;
              return (
                <S.ChatItemContainer key={chat.id} onPress={() => router.push(`/chat-detail?id=${chat.id}`)}>
                <S.Avatar />
                <S.ChatContent>
                  <S.ChatHeader>
                    <S.ChatName>{other?.name || otherId || '상대방'}</S.ChatName>
                    <S.ChatTime>{chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleString() : ''}</S.ChatTime>
                  </S.ChatHeader>
                  <S.LastMessage>{chat.lastMessage?.text || ''}</S.LastMessage>
                </S.ChatContent>
              </S.ChatItemContainer>
            );
          })}
        </S.ChatList>
      </SafeAreaView>
    </S.Container>
  );
}