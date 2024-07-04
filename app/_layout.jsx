import { Stack } from 'expo-router'
import React from 'react'
import { AccountProvider } from './context/AccountContext.js'
import { UserProvider } from './context/UserContext.jsx'
import { DateProvider } from './context/DateContext.jsx'
import { DaysPlayedProvider } from './context/DaysPlayedContext.jsx'

export default function RootLayout() {
  return (
    <UserProvider>
      <DaysPlayedProvider>
        <DateProvider>
          <AccountProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </AccountProvider>
        </DateProvider>
      </DaysPlayedProvider>
    </UserProvider>
  )
}
