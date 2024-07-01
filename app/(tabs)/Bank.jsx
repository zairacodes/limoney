import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header.js'
import { SafeAreaView } from 'react-native-safe-area-context'

const bank = () => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Bank and Investment page</Text>
    </SafeAreaView>
  )
}

export default bank
