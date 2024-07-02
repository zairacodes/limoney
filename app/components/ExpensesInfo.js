import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import Tax from "./Tax";
export default function ExpensesInfo({
  rent,
  setRent,
  setUtilities,
  utilities,
}) {
  const { accBalance, setAccBalance } = useContext(AccountContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  //const [businessBalance, setBusinessBalance] = useState(3000);

  const months = [
    { id: "1", month: "January", status: "paid" },
    { id: "2", month: "February", status: "pending" },
    { id: "3", month: "March", status: "paid" },
    { id: "4", month: "April", status: "pending" },
    { id: "5", month: "May", status: "paid" },
    { id: "6", month: "June", status: "pending" },
    { id: "7", month: "July", status: "paid" },
    { id: "8", month: "August", status: "pending" },
    { id: "9", month: "September", status: "paid" },
    { id: "10", month: "October", status: "pending" },
    { id: "11", month: "November", status: "paid" },
    { id: "12", month: "December", status: "pending" },
  ];

  // useEffect(() => {
  //   const increaseExpenses = () => {
  //     const rentIncrease = 100;
  //     const utilitiesIncrease = 20;
  //     const balanceIncrease = 10;

  //     setRent((prevRent) => prevRent + rentIncrease);
  //     setUtilities((prevUtilities) => prevUtilities + utilitiesIncrease);
  //     setAccBalance((prevBalance) => prevBalance + balanceIncrease);
  //   };

  //   const intervalId = setInterval(increaseExpenses, 5000);

  //   return () => clearInterval(intervalId);
  // }, [setRent, setUtilities, setAccBalance]);

  const payRent = () => {
    if (accBalance >= rent) {
      setRent(0);
      setAccBalance(accBalance - rent);
      logTransaction("Rent payment", rent);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the rent."
      );
    }
  };

  const payUtilities = () => {
    if (accBalance >= utilities) {
      setUtilities(0);
      setAccBalance(accBalance - utilities);
      logTransaction("Utilities payment", utilities);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the utilities."
      );
    }
  };

  const logTransaction = (description, amount) => {
    const date = new Date().toLocaleString();
    const newTransaction = { description, amount, date };
    setTransactionHistory((prevHistory) => [...prevHistory, newTransaction]);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.bText}>Business Balance: £{businessBalance}</Text> */}
      <View style={styles.rentContainer}>
        <Text style={styles.text}>Rent: {rent}</Text>
        <Button title="Pay The Rent" onPress={payRent} />
      </View>
      <FlatList
        data={months}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.monthContainer}>
            <Text style={styles.monthText}>{item.month}: </Text>
            <Text
              style={[
                styles.statusText,
                item.status === "paid" ? styles.paid : styles.pending,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
      <View style={styles.utilitiesContainer}>
        <Text style={styles.text}>Utilities: {utilities}</Text>
        <Button title="Pay Utilities" onPress={payUtilities} />
      </View>
      <Tax
        transactionHistory={transactionHistory}
        setTransactionHistory={setTransactionHistory}
      />
      <Text style={styles.text}>Payment History</Text>
      <FlatList
        data={transactionHistory}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.date} - {item.description}: ${item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  rentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  utilitiesContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    paddingRight: 10,
    fontSize: 20,
    color: "orange",
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  monthText: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 16,
  },
  paid: {
    color: "green",
  },
  pending: {
    color: "red",
  },
  // bText: {
  //   color: "green",
  //   paddingBottom: 20,
  //   fontSize: 16,
  // },
});
