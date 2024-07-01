import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AccountContext } from '../context/AccountContext'

export default function Header() {
  const { accBalance } = useContext(AccountContext)
  return (
    <View>
      <Text>Account Balance: £{accBalance}</Text>
    </View>
  )
}
