import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  
`;

export const Header = styled.View`
  padding: 20px;
  
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-family: 'Pretendard-SemiBold';
`;

export const ChatList = styled.ScrollView`
  flex: 1;
`;

export const ChatItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f5;
`;

export const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #f3f4f5;
  margin-right: 15px;
`;

export const ChatContent = styled.View`
  flex: 1;
`;

export const ChatHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const ChatName = styled.Text`
  font-size: 16px;
  color: #000000;
  font-family: 'Pretendard-Bold';
`;

export const ChatTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textgray};
  font-family: 'Pretendard-Regular';
`;

export const LastMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textgray};
  font-family: 'Pretendard-Regular';
`;
