import AuthCommon from "@/components/auth/auth-common";
import { InputSection } from "@/components/section/input-section";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { signup } from "@/services/auth";

export default function SignupPage2() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 필요합니다!");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const region = `${address.region} ${address.city || ""}`;
      console.log("현재 위치:", region);

      setLocation(region);
    })();
  }, []);

  const handleSignup = async () => {
    if (!email || !password || !passwordConfirm || !name) {
      Alert.alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await signup({
        email,
        password,
        name,
        location,
        career: parseInt(career, 10), 
      }); 
      console.log("✅ 회원가입 성공:", res);

      Alert.alert("회원가입이 완료되었습니다!");
      router.replace("/login");
    } catch (e: any) {
      Alert.alert(
        "회원가입 실패",
        e.response?.data?.message || "다시 시도해주세요."
      );
    }
  };

  return (
    <AuthCommon title="회원가입" buttonText="완료" action={handleSignup}>
      <Title>회원정보를 입력해주세요</Title>
      <InputSectionContainer>
        <InputSection
          title="이메일"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={setEmail}
        />
        <InputSection
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <InputSection
          title="비밀번호 확인"
          placeholder="비밀번호를 확인해주세요"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
        />
        <InputSection
          title="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={name}
          onChangeText={setName}
        />
        <InputSection
          title="경력"
          placeholder="경력 n년 차"
          value={career}
          onChangeText={setCareer}
        />
      </InputSectionContainer>
    </AuthCommon>
  );
}

const Title = styled.Text`
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const InputSectionContainer = styled.View`
  flex-direction: column;
  gap: 20px;
`;
