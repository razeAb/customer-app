// components/ui/RestaurantCard.tsx
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  description: string;
  url: string;
  image: string;
  isOpen: boolean;
};

export default function RestaurantCard({ name, description, url, image, isOpen }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(url)}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={[styles.status, { color: isOpen ? "#34C759" : "#FF3B30" }]}>{isOpen ? "Open" : "Closed"}</Text>
      </View>
    </TouchableOpacity>
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
  image: {
    width: "100%",
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  desc: {
    marginTop: 4,
    color: "#6E6E73",
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },
});
