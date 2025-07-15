import { Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";

export const AccessRow = () => {
  return (
    <Contaienr>
      <Entypo name="check" size={24} color="black" />
      <AccessText>[필수] 개인정보 수집 및 이용 동의</AccessText>
    </Contaienr>
  );
};

const Contaienr = styled.View`
  width: 100%;
  flex-direction: row;
`;
const AccessText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
`;
