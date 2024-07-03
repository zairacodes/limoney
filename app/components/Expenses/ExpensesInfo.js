import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountContext";
import Tax from "./Tax";
import RandomEvents from "./RandomEvents";
import { UserContext } from "../../context/UserContext";

export default function ExpensesInfo({
  rent,
  setRent,
  setUtilities,
  utilities,
}) {
  const { user, setUser } = useContext(UserContext);
  const [transactionHistory, setTransactionHistory] = useState([]);

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

  const logTransaction = (description, amount) => {
    const date = new Date().toLocaleString();
    const newTransaction = { description, amount, date };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
  };

  return (
    <View style={styles.container}>
      <RandomEvents setTransactionHistory={setTransactionHistory} />
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
              {item.date} - {item.description}: £{item.amount}
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
});
