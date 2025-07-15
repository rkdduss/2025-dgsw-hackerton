import { View, Alert } from 'react-native';
import AuthCommon from '../../components/auth/auth-common';
import { InputSection } from '../../components/section/input-section';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { login } from '@/services/auth';


export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("이메일과 비밀번호를 모두 입력해주세요!");
      return;
    }

    try {
      const res = await login(email, password);
      console.log("✅ 로그인 성공:", res);

      // 👉 토큰 저장 필요하면 여기서 AsyncStorage 등에 저장 가능

      router.replace("/(tabs)/main");
    } catch (e: any) {
      Alert.alert("로그인 실패", e.response?.data?.message || "문제가 발생했어요");
    }
  };

  return (
    <AuthCommon title="로그인" buttonText="로그인" action={handleLogin}>
      <InputSection
        title="이메일"
        placeholder="이메일을 입력해주세요."
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={{ height: 20 }} />
      <InputSection
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    </AuthCommon>
  );
}