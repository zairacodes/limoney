import React from "react";
import StockList from "../../components/Operation/StockList.js";
import LemonadeRecipe from "../../components/Operation/LemonadeRecipe.js";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";

const operation = () => {
  return (
    <ImageBackground
      source={require("../../utils/backgrounds/OperationsBackground.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StockList />
        <LemonadeRecipe />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default operation;
