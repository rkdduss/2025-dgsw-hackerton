import * as S from "../styles/pages/splash";
import Splash from "../../assets/splash.png";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/main"); 
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <S.Container>
      <S.Logo source={Splash} />
    </S.Container>
  );
};
