import * as S from "../../styles/pages/auth-main";
import Main from "../../../assets/main.png";
import { Image, View } from "react-native";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { useRouter } from "expo-router";

export default function MainPage ()  {
  const router = useRouter();

  return (
    <S.Container>
      <Image source={Main} />
      <S.Title>프리랜서 & 무직 필수 구직 앱</S.Title>
      <S.SubTitle>일일 알바 부터 장기 알바까지</S.SubTitle>
      <S.SubTitle>지금 내 경력을 인증하고 시작해보세요!</S.SubTitle>
      <View style={{ flex: 1 }}></View>
      <PrimaryButton action={() => router.push("/signup")} text="회원가입" />
      <S.ExistingUser>
        <S.SubTitle>이미 회원이신가요?</S.SubTitle>
        <S.ExistingUserText onPress={() => router.push("/login")}>로그인</S.ExistingUserText>
      </S.ExistingUser>
    </S.Container>
  );
};