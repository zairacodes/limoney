import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { UserContext } from "../../context/UserContext";

export default function Tax({ setTransactionHistory }) {
  const { user, setUser } = useContext(UserContext);
  const [tax, setTax] = useState(0);

  const logTransaction = (description, amount) => {
    const date = new Date().toLocaleString();
    const newTransaction = { description, amount, date };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
  };

  useEffect(() => {
    const calculateTax = (balanceIncrease) => {
      return balanceIncrease * 0.2;
    };

    const handleBalanceIncrease = () => {
      if (user.totalProfit > 0) {
        const newTax = calculateTax(user.totalProfit);
        setTax((prevTax) => prevTax + newTax);
      }
    };

    const intervalId = setInterval(handleBalanceIncrease, 3000);

    return () => clearInterval(intervalId);
  }, [user.totalProfit]);

  const payTax = () => {
    if (user.accountBalance >= tax) {
      const newAccountBalance = user.accountBalance - tax;
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: newAccountBalance,
        totalProfit: 0,
      }));
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
