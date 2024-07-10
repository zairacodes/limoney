import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { colours } from "../../utils/colours";
import Tax from "./Tax";
import RandomEvents from "./RandomEvents";
import { UserContext } from "../../context/UserContext";
export default function ExpensesInfo({
  rent,
  setRent,
  setUtilities,
  utilities,
}) {
  const { user, setUser, setFulfillRent, setFulfillUtilities } =
    useContext(UserContext);
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

  const [accuRent, setAccuRent] = useState(0);
  const [totalRent, setTotalRent] = useState(rent + accuRent);

  const [accuUtilities, setAccuUtilities] = useState(0);
  const [totalUtilities, setTotalUtilities] = useState(
    utilities + accuUtilities
  );

  useEffect(() => {
    if (user.currentDate.month === "January") {
      setPaidMonths([]);
      setPaidUtilitiesMonths([]);
    }
  }, [user.currentDate.month]);

  useEffect(() => {
    const indexOfPreviousMonth = months.indexOf(user.currentDate.month) - 1;

    if (indexOfPreviousMonth >= 0) {
      const previousMonth = months[indexOfPreviousMonth];
      if (!paidMonths.includes(previousMonth)) {
        const updatedAccuRent = accuRent + rent;
        setAccuRent(updatedAccuRent);
        setTotalRent(rent + updatedAccuRent);
      }

      // Utilities
      if (!paidUtilitiesMonths.includes(previousMonth)) {
        const updatedAccuUtilities = accuUtilities + utilities;
        setAccuUtilities(updatedAccuUtilities);
        setTotalUtilities(utilities + updatedAccuUtilities);
      }
    }
  }, [user.currentDate.month]);

  useEffect(() => {
    if (!paidMonths.includes(user.currentDate.month))
      setFulfillUtilities(false);
  }, [user.currentDate.month, paidMonths]);

  useEffect(() => {
    if (user.accountBalance <= 0) {
      Alert.alert(
        "Game Over",
        "Your account balance is zero or below. Game over!"
      );
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: 0,
      }));
    }
  }, [user.accountBalance]);

  const payRent = () => {
    if (user.accountBalance >= totalRent) {
      logTransaction("Rent payment", totalRent);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - totalRent,
      }));
      const currentMonthIndex = months.indexOf(user.currentDate.month);
      const updatedPaidMonths = [...paidMonths];
      for (let i = 0; i <= currentMonthIndex; i++) {
        if (!updatedPaidMonths.includes(months[i])) {
          updatedPaidMonths.push(months[i]);
        }
      }
      setFulfillRent(true);
      setPaidMonths(updatedPaidMonths);
      setAccuRent(0);
      setTotalRent(2000);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the rent."
      );
    }
  };

  const payUtilities = () => {
    if (user.accountBalance >= totalUtilities) {
      logTransaction("Utilities payment", totalUtilities);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - totalUtilities,
      }));

      const currentMonthIndex = months.indexOf(user.currentDate.month);
      const updatedUtilitiesPaidMonths = [...paidUtilitiesMonths];
      for (let i = 0; i <= currentMonthIndex; i++) {
        if (!updatedUtilitiesPaidMonths.includes(months[i])) {
          updatedUtilitiesPaidMonths.push(months[i]);
        }
      }
      setPaidUtilitiesMonths(updatedUtilitiesPaidMonths);
      setFulfillUtilities(true);
      setAccuUtilities(0);
      setTotalUtilities(500);
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
  const renderMonthItem = (item, type) => {
    const isRentPaid = paidMonths.includes(item);
    const isUtilitiesPaid = paidUtilitiesMonths.includes(item);
    return (
      <View key={item} style={styles.monthContainer}>
        <View style={styles.leftPaymentStatusCol}>
          <Text style={styles.monthText}>{item}: </Text>
        </View>
        {type === "Rent" && (
          <View style={styles.rightPaymentStatusCol}>
            <Text
              style={[
                styles.statusText,
                isRentPaid ? styles.paid : styles.pending,
              ]}
            >
              {isRentPaid ? "Paid" : "Pending"}
            </Text>
          </View>
        )}

        {type === "Utilities" && (
          <View style={styles.rightPaymentStatusCol}>
            <Text
              style={[
                styles.statusText,
                isUtilitiesPaid ? styles.paid : styles.pending,
              ]}
            >
              {isUtilitiesPaid ? "Paid" : "Pending"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.box}>
        <RandomEvents setTransactionHistory={setTransactionHistory} />
        <View style={styles.paymentContainer}>
          <View style={styles.leftPaymentTitleCol}>
            <Text style={styles.text}>Rent: £{totalRent}</Text>
          </View>
          <View style={styles.rightPaymentTitleCol}>
            <Button
              style={styles.button}
              onPress={payRent}
              disabled={paidMonths.includes(user.currentDate.month)}
            >
              PAY
            </Button>
          </View>
        </View>

        <View>{months.map((item) => renderMonthItem(item, "Rent"))}</View>
      </View>

      <View style={styles.box}>
        <View style={styles.paymentContainer}>
          <View style={styles.leftPaymentTitleCol}>
            <Text style={styles.text}>Utilities: £{totalUtilities}</Text>
          </View>
          <View style={styles.rightPaymentTitleCol}>
            <Button
              style={styles.button}
              title="Pay Utilities"
              onPress={payUtilities}
              disabled={paidUtilitiesMonths.includes(user.currentDate.month)}
            >
              PAY
            </Button>
          </View>
        </View>
        <View>{months.map((item) => renderMonthItem(item, "Utilities"))}</View>
      </View>
      <Tax
        transactionHistory={transactionHistory}
        setTransactionHistory={setTransactionHistory}
      />
      <View style={styles.box}>
        <Text style={styles.titleText}>Payment History</Text>
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

  innerBox: {
    marginBottom: 20,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
  },

  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    paddingRight: 5,
    fontSize: 18,
  },

  leftPaymentTitleCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  leftPaymentStatusCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    paddingLeft: 35,
  },

  rightPaymentTitleCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  rightPaymentStatusCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 25,
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
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    marginRight: "10%",
    marginBottom: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },

  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
