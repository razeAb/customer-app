import { Feather } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="index"
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          drawerType: "front",
          drawerStyle: { width: 280, backgroundColor: "#0E1B3D" },
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#c7c9d3",
          drawerLabelStyle: { fontSize: 16, marginLeft: -6 },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={{
                marginLeft: 16,
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#F2F2F3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="menu" size={22} color="#0F172A" />
            </Pressable>
          ),
        })}
      >
        <Drawer.Screen name="index" options={{ title: "דף ראשי", drawerLabel: "Home" }} />
        {/* (Optional) <Drawer.Screen name="login" options={{ title: "Login" }} /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
}
