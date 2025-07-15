
import { View } from 'react-native';
import * as S from '../../styles/pages/login';
import AuthCommon from '../../components/auth/auth-common';
import { InputSection } from '../../components/section/input-section';
import { useRouter } from 'expo-router';
export default function LoginPage() {
    const router = useRouter();
    return (
       <AuthCommon 
        title='로그인'
        buttonText='로그인'
        action={() => {
            router.replace("/(tabs)/main")
        }}
       >
        <InputSection title='이메일' placeholder='이메일을 입력해주세요.'/>
        <View style={{height:20}}/>
        <InputSection title='비밀번호' placeholder='비밀번호를 입력해주세요.'/>
       </AuthCommon>
    );
}


// rface Props {
//     title: string;
//     children: ReactNode;
//     buttonText: string;