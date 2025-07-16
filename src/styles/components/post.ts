import { Image } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
`;

export const PostImage = styled(Image)`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  background-color: #f3f4f5;
  margin-right: 15px;
`;

export const PostContent = styled.View`
  gap: 5px;
`;

export const PostTitle = styled.Text`
  font-size: 18px;
  color: #000000;
  font-family: 'Pretendard-SemiBold';
`;

export const PostInfo = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textgray};
  font-family: 'Pretendard-Regular';
`;

export const PostPrice = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Pretendard-Bold';
`;