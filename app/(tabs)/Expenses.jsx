import { StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";
import ExpensesInfo from "../components/Expenses/ExpensesInfo.js";

const expenses = () => {
  const [rent, setRent] = useState(2000);
  const [utilities, setUtilities] = useState(500);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../utils/backgrounds/ExpensesBackground.png")}
        // style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <Header />
        <ExpensesInfo
          rent={rent}
          setRent={setRent}
          utilities={utilities}
          setUtilities={setUtilities}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default expenses;
