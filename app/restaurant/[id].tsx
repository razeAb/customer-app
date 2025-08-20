// app/restaurant/[id].tsx
import React, { useMemo } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { restaurants } from "../../constants/restaurants";

export default function RestaurantWebView() {
  const { id, url, name } = useLocalSearchParams<{ id?: string; url?: string; name?: string }>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const title = useMemo(() => {
    const decodedName = name ? decodeURIComponent(String(name)) : undefined;
    const fallback = restaurants.find((r) => String(r.id) === String(id))?.name;
    return decodedName || fallback || "מסעדה";
  }, [id, name]);

  // If no URL provided, show a normal Stack header + message
  if (!url || typeof url !== "string") {
    return (
      <>
        <Stack.Screen
          options={{
            title,
            headerBackTitle: "חזרה לדף הראשי",
            headerShown: true,
          }}
        />
        <View style={styles.center}>
          <Text>No URL provided</Text>
        </View>
      </>
    );
  }

  // Normal case: hide native header to avoid double bars and overlay our own menu button
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <WebView
        source={{ uri: String(url) }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />

      {/* Floating hamburger to open the drawer */}
      <Pressable
        accessibilityLabel="Open menu"
        accessibilityRole="button"
        style={[styles.menuButton, { top: insets.top + 10 }]}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={22} color="#0F172A" />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  menuButton: {
    position: "absolute",
    left: 16,
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});
