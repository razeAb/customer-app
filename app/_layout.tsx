// app/_layout.tsx
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="index"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: "center",
          drawerType: "front",
          drawerStyle: { width: 280, backgroundColor: "#0E1B3D" },
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#c7c9d3",
          drawerLabelStyle: { fontSize: 16, marginLeft: -6 },
        }}
      >
        <Drawer.Screen name="index" options={{ title: "דף ראשי", drawerLabel: "Home" }} />
        {/* (Optional) <Drawer.Screen name="login" options={{ title: "Login" }} /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
}
