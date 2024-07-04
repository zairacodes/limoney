import { Stack } from 'expo-router'
import React from 'react'
import { UserProvider } from './context/UserContext.jsx'
import { SafeAreaView, StyleSheet } from 'react-native'
import Header from './components/Header.js'

export default function RootLayout() {
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
})
