import styled from "styled-components/native";

export const Container = styled.View`
  padding: 198px 20px 67px 20px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const Title = styled.Text`
  margin: 10px 0;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
`;

export const ExistingUser = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
export const ExistingUserText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;