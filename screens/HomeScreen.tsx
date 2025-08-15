// screens/HomeScreen.tsx
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import { JSX } from "react/jsx-runtime";
import RestaurantCard from "../components/ui/RestaurantCard";
import { restaurants } from "../constants/restaurants";

// If your restaurant IDs are numbers, we'll convert them to strings for keys.
// If they're already strings, this still works.
export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RestaurantCard name={item.name} description={item.description} url={item.url} image={item.image} isOpen={item.isOpen} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Deliver Now!</Text>
              <Text style={styles.location}>Yarka</Text>
            </View>

            <TextInput placeholder="Search for restaurants or cuisines" style={styles.search} placeholderTextColor="#888" />

            <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  search: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 8,
  },
});
