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

  const randomEvents = [
    {
      type: "Bad Weather",
      message: "A sudden thunderstorm hits, forcing you to close early.",
      cost: -50,
    },
    {
      type: "Supply Shortage",
      message: "You ran out of lemons and had to buy more at a higher price.",
      cost: -30,
    },
    {
      type: "Equipment Failure",
      message: "Your juicer broke down and needs immediate repair.",
      cost: -75,
    },
    {
      type: "Health Inspection",
      message:
        "A health inspector visited and required you to make improvements.",
      cost: -40,
    },
    {
      type: "Customer Complaint",
      message:
        "A customer complained about the lemonade, offering a free drink as compensation.",
      cost: -5,
    },
    {
      type: "Stolen Goods",
      message: "Someone stole a batch of your lemons.",
      cost: -25,
    },
    {
      type: "Price Increase",
      message: "The price of sugar increased unexpectedly.",
      cost: -10,
    },
    {
      type: "New Competition",
      message: "A new lemonade stand opened nearby, reducing your sales.",
      cost: -20,
    },
    {
      type: "Community Support",
      message: "The community showed support and bought more lemonade!",
      revenue: 30,
    },
    {
      type: "Staff Illness",
      message: "One of your helpers fell sick, and you had to manage alone.",
      cost: -20,
    },
    {
      type: "Menu Experiment",
      message: "You tried a new lemonade flavor",
      revenue: -25,
    },
  ];

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
});
