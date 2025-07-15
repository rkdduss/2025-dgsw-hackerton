import { AntDesign, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";

export const AccessRow = ({text}:{text:string}) => {
  return (
    <Contaienr>
      <AntDesign name="check" size={20} color="black" />
      <AccessText>{text}</AccessText>
      <Entypo name="chevron-thin-right" size={18} color="black" />
    </Contaienr>
  );
};

const Contaienr = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
const AccessText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
  margin-left: 10px;
  margin-right: auto;
`;
