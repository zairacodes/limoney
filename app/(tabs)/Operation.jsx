import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";
import StockList from "../components/Operation/StockList.js";
import LemonadeRecipe from "../components/Operation/LemonadeRecipe.js";
import { ScrollView } from "react-native";

const operation = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <StockList />
        <LemonadeRecipe />
      </ScrollView>
    </SafeAreaView>
  );
};

export default operation;
