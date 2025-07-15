import React, { useEffect, useState } from 'react';
import * as S from '../../styles/pages/chat';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '@/libs/api';
import { getMyChatRooms, ChatRoom } from '@/services/chat.service';

interface User {
  id: string;
  name: string;
  profile?: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [userMap, setUserMap] = useState<{ [id: string]: User }>({});
  const [loading, setLoading] = useState(true);

  // 유저 정보 캐싱 fetch
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

  useEffect(() => {
    (async () => {
      try {
        const res = await api.axiosInstance.get('/users/me');
        setUser(res.data);
        const rooms = await getMyChatRooms(res.data.id);
        setChatRooms(rooms);
        // 상대방 정보 미리 fetch
        for (const room of rooms) {
          const otherId = room.users.find((uid) => uid !== res.data.id);
          if (otherId) await fetchUser(otherId);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (loading) return <S.Container><S.HeaderTitle>로딩중...</S.HeaderTitle></S.Container>;

  return (
    <S.Container>
      <SafeAreaView style={{width:"100%", height:"100%"}}>
        <S.Header>
          <S.HeaderTitle>채팅</S.HeaderTitle>
        </S.Header>
        <S.ChatList>
          {chatRooms.length === 0 && <S.HeaderTitle>채팅방이 없습니다</S.HeaderTitle>}
          {chatRooms.map((chat) => {
            const otherId = chat.users.find((uid) => uid !== user?.id);
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