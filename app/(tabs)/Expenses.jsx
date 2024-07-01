import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header.js'


const expenses = () => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Expenses page</Text>
    </SafeAreaView>
  )
}

export default expenses
