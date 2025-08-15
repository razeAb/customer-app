import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

export default function RestaurantWebView() {
  const route = useRoute();
  const { url } = route.params as { url: string };

  return <WebView source={{ uri: url }} style={styles.webview} />;
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
