import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

export const Header = styled.View`
  padding: 20px;
  padding-top: 60px; /* For status bar */
`;

export const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const LocationText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 7px;
`;

export const DropdownIcon = styled.Image`
  width: 12px;
  height: 6px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f5;
  border-radius: 10px;
  padding: 15px;
  
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: black;
`;

export const SearchIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  
  padding-bottom: 10px;
`;

export const CategoryContainerLast = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 20px;
  
`

export const CategoryItem = styled.TouchableOpacity`
  width: 20%;
  align-items: center;
`;

export const CategoryIconContainer = styled.View`
  width: 65px;
  height: 65px;
  border-radius: 10px;
  background-color: #f3f4f5;
  margin-bottom: 10px;
`;

export const CategoryText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #000000;
`;

export const Divider = styled.View`
  height: 15px;
  background-color: #f3f4f5;
`;

export const FilterContainer = styled(ScrollView)`
  flex-direction: row;
  padding: 20px;
  padding-bottom: 10px;
  
`;

export const FilterButton = styled.TouchableOpacity<{ active: boolean }>`
  padding: 10px 15px;
  border-radius: 30px;
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : 'rgba(0,0,0,0.05)')};
  margin-right: 10px;
  
`;

export const FilterText = styled.Text<{ active: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ active }) => (active ? '#ffffff' : '#000000')};
`;

export const PostListContainer = styled.View`
  padding: 20px;
`;