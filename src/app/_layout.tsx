import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack 
        screenOptions={{ headerShown: false }} 
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(stacks)" />

      </Stack>
    </ThemeProvider>
  );
}