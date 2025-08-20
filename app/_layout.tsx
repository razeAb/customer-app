// app/_layout.tsx
import { Stack } from "expo-router";
export default function RootLayout() {
  // Root stack only to host the (tabs) group; no headers anywhere by default
  return <Stack screenOptions={{ headerShown: false }} />;
}
