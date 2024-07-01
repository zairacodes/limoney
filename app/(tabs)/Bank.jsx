import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import Investment from '../components/Investment'

const bank = () => {
  return (
    <SafeAreaView>
      <Header />
      <Investment />
    </SafeAreaView>
  )
}

export default bank
