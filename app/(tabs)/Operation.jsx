import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";
import StockList from "../components/Operation/StockList.js";
import LemonadeRecipe from "../components/Operation/LemonadeRecipe.js";

const operation = () => {
  return (
    <SafeAreaView>
      <Header />
      <StockList />
      <LemonadeRecipe />
    </SafeAreaView>
  );
};

export default operation;
