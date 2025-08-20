// app/restaurant/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function RestaurantLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="[id]"
        options={{
          title: "מסעדה",
          headerBackTitle: "חזרה לדף הראשי", // ✅ valid on Stack
        }}
      />
    </Stack>
  );
}
