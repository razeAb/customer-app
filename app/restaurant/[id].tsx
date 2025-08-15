// app/restaurant/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

export default function RestaurantWebView() {
  const { url } = useLocalSearchParams();

  if (!url || typeof url !== "string") return null;

  return (
    <WebView
      source={{ uri: url }}
      startInLoadingState
      renderLoading={() => (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  );
}
