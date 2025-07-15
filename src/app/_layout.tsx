import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClientProvider } from "@tanstack/react-query";
import { RNQueryClient } from "@/queries/queryClient";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={RNQueryClient}>

          <Stack 
            screenOptions={{ headerShown: false }} 
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(stacks)" />

          </Stack>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}