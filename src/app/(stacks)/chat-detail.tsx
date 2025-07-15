import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as S from '../../styles/pages/chat-detail';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ChatDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // 채팅방 ID
  const [messages, setMessages] = useState([
    { id: '1', text: '안녕하세요! 구인 글 보고 연락드립니다.', isMyMessage: false },
    { id: '2', text: '네, 안녕하세요! 어떤 점이 궁금하신가요?', isMyMessage: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { id: String(messages.length + 1), text: inputText.trim(), isMyMessage: true },
      ]);
      setInputText('');
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onPress={() => router.back()}>{/* Add back icon */}</S.BackButton>
        <S.HeaderTitle>김철수</S.HeaderTitle> {/* 실제 채팅 상대방 이름으로 변경 */}
      </S.Header>
      <S.MessageList>
        {messages.map((message) => (
          <S.MessageBubble key={message.id} isMyMessage={message.isMyMessage}>
            <S.MessageText isMyMessage={message.isMyMessage}>
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
    </S.Container>
  );
}
