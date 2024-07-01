import { Stack } from 'expo-router'
import React from 'react'
import { AccountProvider } from './context/AccountContext.js'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <AccountProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AccountProvider>
  )
}
