import { Stack } from 'expo-router'
import React from 'react'
import { AccountProvider } from './context/AccountContext.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserProvider } from './context/UserContext.jsx'
import { db } from './src/config/firebase.js'
import { DateProvider } from './context/DateContext.jsx'

export default function RootLayout() {
  return (
    <UserProvider>
      <DateProvider>
        <AccountProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AccountProvider>
      </DateProvider>
    </UserProvider>
  )
}
