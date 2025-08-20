// app/restaurant/[id].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { restaurants } from "../../constants/restaurants";

export default function RestaurantWebView() {
  const { id, url, name } = useLocalSearchParams<{
    id?: string;
    url?: string;
    name?: string;
  }>();

  const title = (name && decodeURIComponent(String(name))) || restaurants.find((r) => String(r.id) === String(id))?.name || "Restaurant";

  if (!url || typeof url !== "string") {
    return (
      <>
        <Stack.Screen
          options={{
            title,
            headerBackTitle: "חזרה לדף הראשי",
          }}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No URL provided</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title,
          headerBackTitle: "חזרה לדף הראשי",
        }}
      />
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </>
  );
}
