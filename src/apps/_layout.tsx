import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}