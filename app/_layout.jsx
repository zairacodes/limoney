import { Stack } from 'expo-router'
import React from 'react'
import { UserProvider } from './context/UserContext.jsx'

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  )
}
