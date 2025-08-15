import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import RestaurantWebView from "./screens/RestaurantWebView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Yarka Restaurants" component={HomeScreen} />
        <Stack.Screen
          name="RestaurantWebView"
          component={RestaurantWebView}
          options={({ route }) => ({ title: (route.params as { name: string }).name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
