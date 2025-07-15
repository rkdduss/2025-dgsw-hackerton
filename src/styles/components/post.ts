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
  font-weight: 600;
  color: #000000;
  
`;

export const PostInfo = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textgray};
`;

export const PostPrice = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;