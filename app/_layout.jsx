import { Stack } from "expo-router";
import React from "react";
import { AccountProvider } from "./context/AccountContext.js";
import { UserProvider } from "./context/UserContext.jsx";
import { DateProvider } from "./context/DateContext.jsx";
import { DaysPlayedProvider } from "./context/DaysPlayedContext.jsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import Header from "./components/Header.js";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <UserProvider>
      <DaysPlayedProvider>
        <DateProvider>
          <AccountProvider>
            <View style={{ paddingBottom: Math.max(insets.top, 16) }} />
            <Header />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </AccountProvider>
        </DateProvider>
      </DaysPlayedProvider>
    </UserProvider>
  );
}
