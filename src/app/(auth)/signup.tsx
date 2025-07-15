import { View } from "react-native";
import AuthCommon from "../../components/auth/auth-common";
import styled from "styled-components/native";

export default function SignupPage() {
  return (
    <AuthCommon title="회원가입" buttonText="완료" action={() => {}}>
      <Title>서비스 이용을 위한 동의 안내</Title>
      <SubTitle>서비스 이용에 필수적인 사항입니다.</SubTitle>
      <SubTitle>약관을 클릭하여 모두 확인해주세요.</SubTitle>
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
    color: ${({theme}) => theme.colors.textgray};
`