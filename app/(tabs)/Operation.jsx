import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";
import StockList from "../components/Operation/StockList.js";
import LemonadeRecipe from "../components/Operation/LemonadeRecipe.js";
import { StyleSheet, ScrollView } from "react-native";
import { colours } from "../utils/colours";

const operation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <StockList />
        <LemonadeRecipe />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.yellow,
  },
});

export default operation;
