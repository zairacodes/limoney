import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { colours } from "../../utils/colours";
import { UserContext } from "../../context/UserContext";

export default function Tax({ setTransactionHistory }) {
  const { user, setUser } = useContext(UserContext);
  const [tax, setTax] = useState(0);

  const logTransaction = (description, amount) => {
    const newTransaction = {
      description,
      amount,
      date: `${user.currentDate.day} ${user.currentDate.month} ${user.currentDate.year}`,
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
    <View style={styles.box}>
      <View style={styles.taxContainer}>
        <Text style={styles.text}>Tax to Pay: £{tax}</Text>
      </View>
      <Button style={styles.button} onPress={payTax} disabled={tax === 0}>
        PAY
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colours.paleYellow,
  },
  text: {
    fontSize: 18,
  },
  button: {
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },

  taxContainer: {
    alignItems: "center",
    textAlign: "center",
  },
});
