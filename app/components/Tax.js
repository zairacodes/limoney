import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";

export default function Tax({ setTransactionHistory, transactionHistory }) {
  const { accBalance, setAccBalance } = useContext(AccountContext);
  const [tax, setTax] = useState(0);

  const logTransaction = (description, amount) => {
    const date = new Date().toLocaleString();
    const newTransaction = { description, amount, date };
    setTransactionHistory((prevHistory) => [...prevHistory, newTransaction]);
  };

  useEffect(() => {
    const calculateTax = (balanceIncrease) => {
      return balanceIncrease * 0.2;
    };

    const handleBalanceIncrease = () => {
      const balanceIncrease = 0;
      const newTax = calculateTax(balanceIncrease);
      setTax((prevTax) => prevTax + newTax);
    };

    const intervalId = setInterval(handleBalanceIncrease, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const payTax = () => {
    if (accBalance >= tax) {
      setAccBalance(accBalance - tax);
      setTax(0);
      logTransaction("Tax", tax);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the tax."
      );
    }
  };

  return (
    <View style={styles.taxContainer}>
      <Text style={styles.text}>Tax to Pay: {tax.toFixed(2)}</Text>
      <Button title="Pay Tax" onPress={payTax} />
    </View>
  );
}

const styles = StyleSheet.create({
  taxContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: "orange",
    marginBottom: 10,
  },
});
