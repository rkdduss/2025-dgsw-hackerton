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

export const ChipRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 24px;
`;

export const ChipWrapper = styled.TouchableOpacity``;

export const Divider = styled.View`
  width: 100%;
  height: 15px;
  background-color: #f3f4f5;
`;

export const CommunityBoxListArea = styled.View`
  width: 100%;
  padding: 15px 20px 0px 20px;
  gap: 20px;
`;
