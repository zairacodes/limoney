import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header.js'

const operation = () => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Business Operation page</Text>
    </SafeAreaView>
  )
}

export default operation
