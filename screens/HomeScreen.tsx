// screens/HomeScreen.tsx
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RestaurantCard from "../components/ui/RestaurantCard";
import { restaurants } from "../constants/restaurants";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard name={item.name} description={item.description} url={item.url} image={item.image} isOpen={item.isOpen} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
