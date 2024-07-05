import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { colours } from "../../utils/colours";
import { useContext } from "react";
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
  const [paidMonths, setPaidMonths] = useState([]);
  const [paidUtilitiesMonths, setPaidUtilitiesMonths] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (user.currentDate.month === "January") {
      setPaidMonths([]);
      setPaidUtilitiesMonths([]);
    }
  }, [user.currentDate.month]);

  const payRent = () => {
    if (user.accountBalance >= rent) {
      logTransaction("Rent payment", rent);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - rent,
      }));
      setPaidMonths((prev) => [...prev, user.currentDate.month]);
      setRent(2000);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the rent."
      );
    }
  };

  const payUtilities = () => {
    if (user.accountBalance >= utilities) {
      logTransaction("Utilities payment", utilities);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - utilities,
      }));
      setPaidUtilitiesMonths((prev) => [...prev, user.currentDate.month]);
      setUtilities(500);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the utilities."
      );
    }
  };

  const logTransaction = (description, amount) => {
    const newTransaction = {
      description,
      amount,
      date: `${user.currentDate.day} ${user.currentDate.month} ${user.currentDate.year}`,
    };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
  };

  const renderMonthItem = ({ item }) => {
    const isRentPaid = paidMonths.includes(item);
    const isUtilitiesPaid = paidUtilitiesMonths.includes(item);
    return (
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{item}: </Text>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              isRentPaid ? styles.paid : styles.pending,
            ]}
          >
            Rent {isRentPaid ? "paid" : "pending"}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.statusText,
              isUtilitiesPaid ? styles.paid : styles.pending,
            ]}
          >
            Utilities {isUtilitiesPaid ? "paid" : "pending"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <RandomEvents setTransactionHistory={setTransactionHistory} />
      <View style={styles.rentContainer}>
        <Text style={styles.text}>Rent: {rent}</Text>
        <Button
          style={styles.button}
          onPress={payRent}
          disabled={paidMonths.includes(user.currentDate.month)}
        >
          PAY THE RENT
        </Button>
      </View>
      <FlatList
        data={months}
        keyExtractor={(item) => item}
        renderItem={renderMonthItem}
      />
      <View style={styles.utilitiesContainer}>
        <Text style={styles.text}>Utilities: {utilities}</Text>
        <Button
          style={styles.button}
          title="Pay Utilities"
          onPress={payUtilities}
          disabled={paidUtilitiesMonths.includes(user.currentDate.month)}
        >
          PAY UTILITIES
        </Button>
      </View>
      <Tax
        transactionHistory={transactionHistory}
        setTransactionHistory={setTransactionHistory}
      />
      <Text style={styles.text}>Payment History</Text>
      <ScrollView style={styles.scrollView}>
        {transactionHistory.map((item, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text>
              {item.date} - {item.description}: £{item.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
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
  statusContainer: {
    marginLeft: 10,
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
  scrollView: {
    marginTop: 10,
    maxHeight: 200,
  },
  transactionItem: {
    paddingVertical: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});
