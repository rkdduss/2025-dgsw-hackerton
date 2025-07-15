import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="post-detail" />
        <Stack.Screen name="select-certificate" />
        <Stack.Screen name="select-category" />
        <Stack.Screen name="chat-detail" />
      </Stack>
    </ThemeProvider>
  );
}