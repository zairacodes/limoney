import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

import { UserContext } from "../../context/UserContext";
import { DateContext } from "../../context/DateContext";
export default function Tax({ setTransactionHistory }) {
  const { user, setUser } = useContext(UserContext);
  const [tax, setTax] = useState(0);
  const { date } = useContext(DateContext);

  const logTransaction = (description, amount) => {
    const newTransaction = {
      description,
      amount,
      date: `${date.day} ${date.month} ${date.year}`,
    };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
  };

  useEffect(() => {
    const calculateTax = () => {
      return 10 * 0.2;
    };

    setTax(tax + calculateTax());
  }, [user.totalProfit]);

  const payTax = () => {
    if (user.accountBalance >= tax) {
      const newAccountBalance = user.accountBalance - tax;
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: newAccountBalance,
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
      <Button title="Pay Tax" onPress={payTax} disabled={tax === 0} />
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
