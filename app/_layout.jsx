import { Stack } from 'expo-router'
import React from 'react'
import { AccountProvider } from './context/AccountContext.js'

export default function RootLayout() {
  return (
    <AccountProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AccountProvider>
  )
}
