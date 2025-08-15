// components/ui/RestaurantCard.tsx
import { useRouter } from "expo-router";
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const router = useRouter();

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
        <Text style={{ color: isOpen ? "green" : "red" }}>{isOpen ? "Open" : "Closed"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    marginTop: 4,
    color: "#555",
  },
});
