import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px;
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

export const CategoryList = styled.ScrollView`
  padding: 0 20px;
`;

export const CategoryItem = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 20px 10px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f5;
`;

export const CategoryText = styled.Text<{ selected: boolean }>`
  font-size: 18px;
  font-weight: ${({ selected }) => (selected ? 'bold' : '600')};
  color: ${({ selected, theme }) => (selected ? theme.colors.primary : '#000000')};
`;

export const ButtonContainer = styled.View`
  padding: 20px;
`;
