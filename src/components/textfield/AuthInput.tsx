import styled from "styled-components/native";
import { TextInputProps } from "react-native";

export const Authinput = (props: TextInputProps) => {
  return (
    <Container>
      <InputArea autoCapitalize="none" {...props} />
    </Container>
  );
};

const Container = styled.View`
  padding: 0 20px;
  width: 100%;
  height: 55px;
  border-radius: 5px;
  background-color: #f3f4f5;
  justify-content: center;
  align-items: center;
`;

const InputArea = styled.TextInput`
  width: 100%;
  color: #000000;
`;
