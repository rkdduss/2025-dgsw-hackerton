import { router, Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { RNQueryClient } from "@/queries/queryClient";
import { useEffect, useState } from "react";
import { api, tokenStorage } from "@/libs/api";

export default function RootLayout() {
  useEffect(()=> {
    api.axiosInstance.get("/users/me")
      .then((res)=>{
        router.replace("/(tabs)/main")
        console.log("dd")
      })
      .catch(err=>{
        console.log(err.response)
        tokenStorage.clearTokens();
      })
  },[])
  
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