import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <Stack 
          screenOptions={{ headerShown: false }} 
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(stacks)" />

        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}