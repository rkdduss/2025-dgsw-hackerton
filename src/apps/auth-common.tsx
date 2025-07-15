import styled from "styled-components/native";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { ReactNode } from "react";
import { TouchableHighlight, View } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  title: string;
  children: ReactNode;
  buttonText: string;
  action: () => void;
}

export default function AuthCommon({ title, children, buttonText, action }: Props) {
  const router = useRouter();
  return (
    <Container>
      <Header>
        <DismissIcon source={require("../../assets/dismiss.png")} />
        <HeaderTitle>{title}</HeaderTitle>
      </Header>
      {children}
      <View style={{ width: "100%", position: "absolute", bottom: 65 }}>
        <PrimaryButton
          text={buttonText}
          action={() => {
            console.log("다음 버튼 클릭!");
            action();
          }}
        />
      </View>
    </Container>
  );
}

const Container = styled.View`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.View`
  width: 100%;
  margin-top: 69px;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: black;
`;

const DismissIcon = styled.Image`
  position: absolute;
  left: 0;
`;
