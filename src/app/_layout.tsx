import { router, Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { RNQueryClient } from "@/queries/queryClient";
import { useEffect, useState } from "react";
import { api, tokenStorage } from "@/libs/api";
import * as Font from 'expo-font';
import { Text, View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.otf'),
        'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.otf'),
        'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.otf'),
        'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.otf'),
        'Pretendard-Light': require('@/assets/fonts/Pretendard-Light.otf'),
        'Pretendard-Thin': require('@/assets/fonts/Pretendard-Thin.otf'),
        'Pretendard-ExtraLight': require('@/assets/fonts/Pretendard-ExtraLight.otf'),
        'Pretendard-ExtraBold': require('@/assets/fonts/Pretendard-ExtraBold.otf'),
        'Pretendard-Black': require('@/assets/fonts/Pretendard-Black.otf'),
      });
      setFontsLoaded(true);
    })();
  }, []);


  useEffect(()=> {
    api.axiosInstance.get("/users/me")
      .then(()=>{
        router.replace("/(tabs)/main")
      })
      .catch(err=>{
        tokenStorage.clearTokens();
      })
  },[])
  if (!fontsLoaded) {
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>폰트 로딩중...</Text></View>;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={RNQueryClient}>
          <Stack 
            screenOptions={{ headerShown: false }} 
          >
            <Stack.Screen name="(tabs)" options={{ animation:"none" }}/>
            <Stack.Screen name="(auth)" options={{ animation:"none" }}/>
            <Stack.Screen name="(stacks)" />
          </Stack>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}