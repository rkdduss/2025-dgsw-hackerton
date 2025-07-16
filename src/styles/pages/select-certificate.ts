import styled from 'styled-components/native';

export const Container = styled.View`
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
  
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f3f4f5;
  border-radius: 10px;
  padding: 15px;
  margin: 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textgray};
`;

export const SearchIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const CertificateList = styled.ScrollView`
  padding: 0 20px;
`;

export const CertificateItem = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 20px 10px;
`;

export const CertificateText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-family: ${({ selected }) => (selected ? 'Pretendard-Bold' : 'Pretendard-SemiBold')};
  color: ${({ selected, theme }) => (selected ? theme.colors.primary : '#000000')};
`;

export const ButtonContainer = styled.View`
  padding: 20px;
  position: absolute;
  width: 100%;
  bottom: 20px;
`;
