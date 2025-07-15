import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  top: 60px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const ImageContainer = styled.View`
  height: 362px;
  background-color: #f3f4f5;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

export const Avatar = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: #f3f4f5;
  margin-right: 10px;
`;

export const UserTextContainer = styled.View`
  gap:3px
`;

export const UserName = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

export const UserLocation = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textgray};
`;

export const PostContentContainer = styled.View`
  padding: 20px;
`;

export const PostTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const PostInfo = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textgray};
  margin-bottom: 20px;
`;

export const PostDescription = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: #141414;
`;

export const Section = styled.View`
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
`;

export const TagContainer = styled.View`
  flex-direction: row;
`;

export const Tag = styled.TouchableOpacity<{ active: boolean }>`
  padding: 10px 15px;
  border-radius: 30px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : 'rgba(0,0,0,0.05)'};
  margin-right: 10px;
`;

export const TagText = styled.Text<{ active: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ active }) => (active ? '#ffffff' : '#000000')};
`;

export const BottomBarContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const BottomBar = styled.View`
  height: 100px;
  background-color: #f2f2f2;
  border-top-width: 1px;
  border-top-color: #dddddd;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
`;

export const PriceContainer = styled.View`
  margin-left: -35px;
  
`;

export const PriceLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textgray};
`;

export const Price = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
