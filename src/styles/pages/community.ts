import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
`;

export const FilterSelectContainer = styled.View`
  margin-bottom: 20px;
`

export const ChipRow = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 24px;
  margin-left: 20;
`;

export const ChipWrapper = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: -10px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 15px;
  background-color: #f3f4f5;
`;

export const CommunityBoxListArea = styled(ScrollView)`
  width: 100%;
  padding: 20px;
`;
