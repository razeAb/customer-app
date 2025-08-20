// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "דף ראשי" }} />
      <Stack.Screen
        name="restaurant/[id]"
        options={{
          headerBackTitle: "חזרה לדף הראשי", // iOS: טקסט כפתור החזרה
        }}
      />
    </Stack>
  );
}
