import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  padding: 20px;
  
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f5;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const MessageList = styled.ScrollView`
  flex: 1;
  padding: 10px 20px;
`;

export const MessageBubble = styled.View<{ isMyMessage: boolean }>`
  background-color: ${({ isMyMessage, theme }) =>
    isMyMessage ? theme.colors.primary : '#f3f4f5'};
  padding: 10px 15px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 80%;
  align-self: ${({ isMyMessage }) =>
    isMyMessage ? 'flex-end' : 'flex-start'};
`;

export const MessageText = styled.Text<{ isMyMessage: boolean }>`
  color: ${({ isMyMessage }) => (isMyMessage ? '#ffffff' : '#000000')};
  font-size: 15px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-top-width: 1px;
  border-top-color: #f3f4f5;
  background-color: #ffffff;
`;

export const MessageInput = styled.TextInput`
  flex: 1;
  background-color: #f3f4f5;
  border-radius: 20px;
  padding: 10px 15px;
  margin-right: 10px;
  font-size: 16px;
`;

export const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const SendButtonText = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;
