import { Image, View } from "react-native";
import styled from "styled-components/native";
import SignupSuccess from "../../../assets/signup-success.png";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { useRouter } from "expo-router";

export default function SignupPage3() {
  const router = useRouter();

  return (
    <Container>
      <Image source={SignupSuccess} />
      <Title>회원가입을 축하합니다!</Title>
      <SubTitle>~를 선택해주셔서 감사합니다!</SubTitle>
      <View style={{width: '100%', position: 'absolute', bottom: 35}}>

      <PrimaryButton text="확인" action={() => router.dismissTo("/")} style="default"/>
      </View>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 10px 0;
`;
const SubTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
`;
