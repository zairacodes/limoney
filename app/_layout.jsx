import { Stack } from 'expo-router'
import React from 'react'
import { AccountProvider } from './context/AccountContext.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserProvider } from './context/UserContext.jsx'

export default function RootLayout() {
  return (
    <UserProvider>
      <AccountProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AccountProvider>
    </UserProvider>
  )
}
