import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";
import StockList from "../components/Operation/StockList.js";
import LemonadeRecipe from "../components/Operation/LemonadeRecipe.js";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";

const operation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../utils/backgrounds/OperationsBackground.png")}
        style={styles.container}
      >
        <ScrollView>
          <Header />
          <StockList />
          <LemonadeRecipe />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default operation;
