import { TouchableOpacity, View } from "react-native";
import AuthCommon from "../../components/auth/auth-common";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { AccessRow } from "@/components/section/access-row";
import { useRouter } from "expo-router";

export default function SignupPage() {
  const [check, setCheck] = useState(false);
  const handleCheck = () => {
    setCheck((prev) => !prev);
  };
  const router = useRouter();
  return (
    <AuthCommon title="회원가입" buttonText="완료" action={() => router.push("/signup2")}>
      <Title>서비스 이용을 위한 동의 안내</Title>
      <SubTitle>서비스 이용에 필수적인 사항입니다.</SubTitle>
      <SubTitle>약관을 클릭하여 모두 확인해주세요.</SubTitle>
      <TouchableOpacity onPress={handleCheck} activeOpacity={0.7}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: 'center',marginTop: 52.5}}>
          <AntDesign
            name={check ? "checkcircle" : "checkcircleo"}
            size={24}
            color="#BFBFBF"
          />
          <AllAgree>모두 동의합니다.</AllAgree>
        </View>
      </TouchableOpacity>
      <AccessRowContainer>
        <AccessRow text="[필수] 개인정보 수집 및 이용 동의"/>
        <AccessRow text="[필수] 개인정보 수집 및 이용 동의"/>
        <AccessRow text="[필수] 개인정보 수집 및 이용 동의"/>
        <AccessRow text="[필수] 개인정보 수집 및 이용 동의"/>
      </AccessRowContainer>
    </AuthCommon>
  );
}

const Title = styled.Text`
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const SubTitle = styled.Text`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textgray};
`;

const AllAgree = styled.Text`
  font-size: 18px;
  font-weight: 700;
`

const AccessRowContainer = styled.View`
  flex-direction: column;
  gap: 35px;
  margin-top: 37.5px;
`