import { Stack, useSegments } from "expo-router";
import React from "react";
import { UserProvider } from "./context/UserContext.jsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import Header from "./components/Header.js";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const noHeaderRoute =
    segments.includes("Login") || segments.includes("Winner");

  return (
    <UserProvider>
      <View style={{ paddingBottom: Math.max(insets.top, 16) }} />
      {!noHeaderRoute && <Header />}
      <Stack>
        <Stack.Screen name="(tabs)/Login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/game" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/Winner" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
