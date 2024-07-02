import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
} from 'react-native'
import { AccountContext } from '../context/AccountContext'

export default function Investment() {
  const { accBalance, setAccBalance } = useContext(AccountContext)
  const [investment, setInvestment] = useState('')
  const [initialInvestment, setInitialInvestment] = useState(0)
  const [investedAmount, setInvestedAmount] = useState(0)
  const [isInvesting, setIsInvesting] = useState(false)
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    let timer
    if (isInvesting) {
      setStartTime(new Date())
      timer = setInterval(() => {
        setInvestedAmount((prevAmount) => prevAmount * 1.02)
      }, 60000)
    }
    return () => clearInterval(timer)
  }, [isInvesting])

  const handleInvest = () => {
    const investmentValue = Number(investment)
    if (investmentValue > 0 && investmentValue <= accBalance) {
      setAccBalance((accBalance - investmentValue).toFixed(2))
      setInvestedAmount(investmentValue)
      setInitialInvestment(investmentValue)
      setIsInvesting(true)
      setInvestment('')
      Keyboard.dismiss()
    }
  }

  const handleRedeem = () => {
    setAccBalance((Number(accBalance) + investedAmount).toFixed(2))
    setInvestedAmount(0)
    setIsInvesting(false)
  }

  const calculateTimeElapsed = () => {
    if (startTime) {
      const now = new Date()
      const elapsed = Math.floor((now - startTime) / 60000)
      return elapsed
    }
    return 0
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Investment (2% every 1 min)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        onChangeText={(value) => setInvestment(value)}
        value={investment}
      />
      <Button title="Invest" onPress={handleInvest} disabled={isInvesting} />
      {isInvesting && (
        <>
          <Button title="Redeem" onPress={handleRedeem} />
          <View style={styles.infoContainer}>
            <Text style={styles.info}>
              Initial Investment: £{initialInvestment}
            </Text>
            <Text style={styles.info}>
              Current Value: £{investedAmount.toFixed(2)}
            </Text>
            <Text style={styles.info}>
              Interest Earned: £
              {(investedAmount - initialInvestment).toFixed(2)}
            </Text>
            <Text style={styles.info}>
              Time Elapsed: {calculateTimeElapsed()} min
            </Text>
          </View>
        </>
      )}
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
  infoContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
})
