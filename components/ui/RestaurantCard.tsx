// components/ui/RestaurantCard.tsx
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  id: string | number;
  name: string;
  description: string;
  url: string;
  image: string;
  isOpen: boolean;
};

export default function RestaurantCard({ id, name, description, url, image, isOpen }: Props) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/restaurant/[id]",
          params: { id: String(id), name, url },
        })
      }
      accessibilityRole="button"
      accessibilityLabel={`Open ${name}`}
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{description}</Text>
        <Text style={[styles.status, { color: isOpen ? "#34C759" : "#FF3B30" }]}>
          {isOpen ? "Open" : "Closed"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12 },
  name: { fontSize: 17, fontWeight: "600", color: "#1C1C1E" },
  desc: { marginTop: 4, color: "#6E6E73" },
  status: { marginTop: 6, fontSize: 13, fontWeight: "500" },
});
