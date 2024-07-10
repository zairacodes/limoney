import { ScrollView, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import ExpensesInfo from "../../components/Expenses/ExpensesInfo.js";

const expenses = () => {
  const [rent, setRent] = useState(2000);
  const [utilities, setUtilities] = useState(500);

  return (
    <ImageBackground
      source={require("../../utils/backgrounds/ExpensesBackground.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ExpensesInfo
          rent={rent}
          setRent={setRent}
          utilities={utilities}
          setUtilities={setUtilities}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default expenses;
