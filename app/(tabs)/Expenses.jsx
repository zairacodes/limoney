import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";
import ExpensesInfo from "../components/Expenses/ExpensesInfo.js";

const expenses = () => {
  const [rent, setRent] = useState(2000);
  const [utilities, setUtilities] = useState(500);
  return (
    <SafeAreaView>
      <Header />
      <Text style={styles.text}>Expenses page</Text>
      <ExpensesInfo
        rent={rent}
        setRent={setRent}
        utilities={utilities}
        setUtilities={setUtilities}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default expenses;
