import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import AuthCommon from "../../components/auth/auth-common";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { AccessRow } from "@/components/section/access-row";

export default function SignupPage() {
  const [check, setCheck] = useState(false);
  const handleCheck = () => {
    setCheck((prev) => !prev);
  };
  return (
    <AuthCommon title="회원가입" buttonText="완료" action={() => {}}>
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
      <AccessRow>
            
      </AccessRow>
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
