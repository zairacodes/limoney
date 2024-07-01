import React, { useState, useContext } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { AccountContext } from '../context/AccountContext'

export default function Investment() {
  const { accBalance, setAccBalance } = useContext(AccountContext)
  const [investment, setInvestment] = useState(0)
  const [investedAmount, setInvestedAmount] = useState(0)
  const [isInvesting, setIsInvesting] = useState(false)

  const handleInvest = () => {
    if (investment > 0 && investment <= accBalance) {
      setAccBalance(accBalance - investment)
      setInvestedAmount(investment)
      setIsInvesting(true)
    }
  }

  const handleRedeem = () => {
    setAccBalance(accBalance + investedAmount)
    setInvestedAmount(0)
    setIsInvesting(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Investment (2% every 1 min)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(value) => setInvestment(Number(value))}
        value={investment.toString()}
      />
      <Button title="Invest" onPress={handleInvest} disabled={isInvesting} />
      {isInvesting && <Button title="Redeem" onPress={handleRedeem} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
})
