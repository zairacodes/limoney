import { Stack } from "expo-router";
import React from "react";
import { AccountProvider } from "./context/AccountContext.js";
import { UserProvider } from "./context/UserContext.jsx";
import { DateProvider } from "./context/DateContext.jsx";
import { DaysPlayedProvider } from "./context/DaysPlayedContext.jsx";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "./components/Header.js";

export default function RootLayout() {
  return (
    <UserProvider>
      <DaysPlayedProvider>
        <DateProvider>
          <AccountProvider>
            <SafeAreaView style={styles.container}>
              <Header />
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </SafeAreaView>
          </AccountProvider>
        </DateProvider>
      </DaysPlayedProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
