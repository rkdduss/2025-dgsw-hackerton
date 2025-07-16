import React, { useEffect, useState, useRef } from 'react';
import * as S from '../../styles/pages/chat-detail';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { api } from '@/libs/api';
import { subscribeMessages, sendMessage, ChatMessage, createChatRoom } from '@/services/chat.service';
import { SafeAreaView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { DismissButton } from '@/components/button/dismiss_button';
import { Entypo } from '@expo/vector-icons';

interface User {
  id: string;
  name: string;
  profile?: string;
}

export default function ChatDetailPage() {
  const router = useRouter();
  const { id: roomId } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [other, setOther] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<() => void>();

  useEffect(() => {
    console.log('[chat-detail] useEffect roomId:', roomId);
    (async () => {
      try {
        const res = await api.axiosInstance.get('/users/me');
        setUser(res.data);
        console.log('[chat-detail] 내 user 정보', res.data);
        // 상대방 id 추출 및 정보 fetch
        if (roomId && typeof roomId === 'string' && res.data.id) {
          const ids = roomId.split('_');
          const otherId = ids.find((uid) => uid !== res.data.id);
          if (otherId) {
            try {
              const otherRes = await api.axiosInstance.get(`/users/${otherId}`);
              setOther(otherRes.data);
              console.log('[chat-detail] 상대방 정보', otherRes.data);
            } catch (err) {
              setOther({ id: otherId, name: otherId });
              console.log('[chat-detail] 상대방 정보 fetch 실패', err);
            }
          }
        }
      } catch (err) {
        console.log('[chat-detail] 내 user 정보 fetch 실패', err);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    console.log('roomId:', roomId);
    console.log('[chat-detail] subscribeMessages useEffect', roomId);
    if (typeof roomId !== 'string') return;
    unsubscribeRef.current = subscribeMessages(roomId, (msgs) => {
      console.log('messages:', msgs);
      setMessages(msgs);
    });
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !user || typeof roomId !== 'string') {
      console.log('[chat-detail] handleSendMessage 조건 미충족', { inputText, user, roomId });
      return;
    }
    setError(null);

    // 채팅방 생성 보장
    const ids = roomId.split('_');
    const otherId = ids.find((uid) => uid !== user.id);
    if (otherId) {
      await createChatRoom(user.id, otherId);
    }

    const msgObj = {
      text: inputText.trim(),
      senderId: user.id,
      createdAt: Date.now(),
    };
    try {
      console.log('[chat-detail] sendMessage 호출', { roomId, msgObj });
      await sendMessage(roomId, msgObj);
      console.log('[chat-detail] sendMessage 성공');
      setInputText('');
    } catch (e) {
      console.error('[chat-detail] sendMessage 실패', e);
      setError('메시지 전송 실패! ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <S.Container>
        <SafeAreaView style={{height:"100%"}}>
          <S.Header>
            <S.BackButton onPress={()=>{
                router.dismiss();
              }}>
                <Entypo name="chevron-thin-left" size={22} color="black" />        
            </S.BackButton>
            <S.HeaderTitle>{other?.name || other?.id || '상대방'}</S.HeaderTitle>
          </S.Header>
          <S.MessageList>
            {messages.map((message) => (
              <S.MessageBubble key={message.id} isMyMessage={message.senderId === user?.id}>
                <S.MessageText isMyMessage={message.senderId === user?.id}>
                  {message.text}
                </S.MessageText>
              </S.MessageBubble>
            ))}
          </S.MessageList>
          <S.InputContainer>
            <S.MessageInput
              placeholder="메시지를 입력하세요..."
              value={inputText}
              onChangeText={setInputText}
            />
            <S.SendButton onPress={handleSendMessage}>
              <S.SendButtonText>▶</S.SendButtonText>
            </S.SendButton>
          </S.InputContainer>
          {error && <S.HeaderTitle style={{ color: 'red', fontSize: 14, marginTop: 8 }}>{error}</S.HeaderTitle>}  
        </SafeAreaView>
      </S.Container>
    </KeyboardAvoidingView>
  );
}
