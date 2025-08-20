// app/index.tsx
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Stack, useNavigation, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { restaurants } from "../constants/restaurants";

const { width } = Dimensions.get("window");
const SPACING = 16;
const RADIUS_LG = 24;
const RADIUS_MD = 16;
const COLORS = {
  bg: "#F3F3F5",
  card: "#FFFFFF",
  text: "#1D1D1F",
  sub: "#6E6E73",
  accent: "#FF8F2C",
  pillOn: "#FFD37E",
  pillOff: "#FFFFFF",
  pillShadow: "rgba(0,0,0,0.06)",
  searchBg: "#F2F2F3",
  divider: "#ECECEE",
  iconDark: "#0F172A",
};

const CATEGORIES = [
  { id: "all", label: "All", icon: "ellipse" as const, active: true },
  { id: "hotdog", label: "Hot Dog", icon: "fast-food-outline" as const },
  { id: "burger", label: "Burger", icon: "pizza-outline" as const },
  { id: "wings", label: "Wings", icon: "drumstick" as const },
];

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const openRestaurants = useMemo(() => restaurants.filter((r) => r.isOpen), []);

  const handleOpenRestaurant = (item: any) => {
    router.push({
      pathname: "/restaurant/[id]",
      params: { id: String(item.id), name: item.name, url: item.url },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={{ padding: SPACING }} showsVerticalScrollIndicator={false}>
        <View style={styles.surface}>
          {/* Top row */}
          <View style={styles.topRow}>
            <Pressable style={styles.avatarBtn} onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={22} color={COLORS.iconDark} />
            </Pressable>

            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={styles.deliverTo}>DELIVER TO</Text>
              <Pressable style={styles.locationRow}>
                <Text style={styles.locationText}>yarka</Text>
                <Feather name="chevron-down" size={18} color={COLORS.sub} />
              </Pressable>
            </View>

            {/* ✅ Navigate to /login on press */}
            <Pressable
              style={styles.cartBtn}
              onPress={() => router.push("/login")}
              accessibilityRole="button"
              accessibilityLabel="Open login"
            >
              <Ionicons name="bag-outline" size={22} color="#fff" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </Pressable>
          </View>

          {/* Greeting */}
          <Text style={styles.greeting}>
            Hey user, <Text style={{ fontWeight: "700" }}>Good Afternoon!</Text>
          </Text>

          {/* Search */}
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color={COLORS.sub} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search dishes, restaurants"
              placeholderTextColor={COLORS.sub}
              returnKeyType="search"
            />
          </View>

          {/* All Categories */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Categories</Text>
            <Pressable style={styles.seeAllRow}>
              <Text style={styles.seeAll}>See All</Text>
              <Feather name="chevron-right" size={18} color={COLORS.sub} />
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 8 }}>
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id || (cat.id === "all" && activeCategory === "all");
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  style={[styles.pill, { backgroundColor: cat.id === "all" && active ? COLORS.pillOn : COLORS.pillOff }, styles.shadowSm]}
                >
                  <View style={styles.pillIconWrap}>
                    {cat.id === "wings" ? (
                      <MaterialCommunityIcons name="food-drumstick" size={18} color="#8FA2B2" />
                    ) : (
                      <Ionicons name={cat.icon as any} size={18} color="#8FA2B2" />
                    )}
                  </View>
                  <Text style={[styles.pillLabel, { color: COLORS.text, fontWeight: active && cat.id === "all" ? "700" : "600" }]}>
                    {cat.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Open Restaurants */}
          <View style={[styles.sectionHeader, { marginTop: 8 }]}>
            <Text style={styles.sectionTitle}>Open Restaurants</Text>
            <Pressable style={styles.seeAllRow}>
              <Text style={styles.seeAll}>See All</Text>
              <Feather name="chevron-right" size={18} color={COLORS.sub} />
            </Pressable>
          </View>

          <FlatList
            data={openRestaurants}
            keyExtractor={(item) => String(item.id)}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: SPACING }}
            ItemSeparatorComponent={() => <View style={{ height: SPACING }} />}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleOpenRestaurant(item)} style={styles.restBody}>
                <Image source={{ uri: item.image }} style={styles.restImage} />
                <Text style={styles.restName}>{item.name}</Text>
                <Text style={styles.restSub} numberOfLines={1}>
                  {item.description || "Burger - Chiken - Riche - Wings"}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="star-outline" size={18} color={COLORS.accent} />
                    <Text style={styles.metaText}>{(item as any).rating ?? "4.7"}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="truck-fast-outline" size={18} color={COLORS.accent} />
                    <Text style={styles.metaText}>Free</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={18} color={COLORS.accent} />
                    <Text style={styles.metaText}>{(item as any).eta ?? "20 min"}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_WIDTH = width - SPACING * 2;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS_LG,
    padding: SPACING,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  topRow: { flexDirection: "row", alignItems: "center" },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.searchBg,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0E1B3D",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: COLORS.accent,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  deliverTo: { color: COLORS.accent, fontSize: 12, letterSpacing: 0.4, fontWeight: "800" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  locationText: { color: COLORS.text, fontSize: 16, fontWeight: "600", marginRight: 4 },
  greeting: { marginTop: 18, fontSize: 22, color: COLORS.text },
  searchBar: {
    marginTop: 14,
    backgroundColor: COLORS.searchBg,
    borderRadius: 18,
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.text },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 22, color: COLORS.text, fontWeight: "700" },
  seeAllRow: { flexDirection: "row", alignItems: "center" },
  seeAll: { color: COLORS.sub, fontSize: 15, marginRight: 4 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    marginRight: 12,
  },
  pillIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5ECF2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  pillLabel: { fontSize: 16, color: COLORS.text },
  shadowSm: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  restBody: { paddingLeft: 10 }, // ← moves title, subtitle, and meta a bit right
  restCard: { width: CARD_WIDTH, alignSelf: "center" },
  restImage: { width: "100%", height: 190, borderRadius: RADIUS_MD, backgroundColor: "#C0CAD6" },
  restName: { marginTop: 12, fontSize: 22, fontWeight: "700", color: COLORS.text },
  restSub: { marginTop: 4, color: "#959AA5", fontSize: 15 },
  metaRow: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 18 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 15, color: COLORS.text, fontWeight: "600" },
});
