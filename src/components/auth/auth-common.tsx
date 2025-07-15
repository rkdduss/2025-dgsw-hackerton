import styled from "styled-components/native";
import { PrimaryButton } from "../button/PrimaryButton";
import { ReactNode } from "react";
import * as RN from "react-native";
import { useRouter } from "expo-router";

import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";


interface Props {
  title: string;
  children: ReactNode;
  buttonText: string;
  action: () => void;
}

export default function AuthCommon({ title, children, buttonText, action }: Props) {
  const router = useRouter();
  return (
    <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss} accessible={false}>
      <RN.KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={RN.Platform.OS === "ios" ? "padding" : "height"}
      >
        <Container>
          <Header>
            <DismissIcon onPress={()=>router.dismiss()}>
              <Entypo name="chevron-thin-left" size={22} color="black" />        
            </DismissIcon>
            <HeaderTitle>{title}</HeaderTitle>
          </Header>
          <Child>
            {children}
          </Child>
          <RN.View style={{ width: "100%" }}>
            <PrimaryButton
              text={buttonText}
              action={() => {
                console.log("다음 버튼 클릭!");
                action();
              }}
            />
          </RN.View>
        </Container>
      </RN.KeyboardAvoidingView>
    </RN.TouchableWithoutFeedback>
  );
}

const Container = styled(SafeAreaView)`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Child = styled.View`
  width: 100%;
  flex: 1;
`

const Header = styled.View`
  width: 100%;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
  margin-top: 10px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: black;
`;

const DismissIcon = styled(RN.Pressable)`
  position: absolute;
  left: 0;
`;