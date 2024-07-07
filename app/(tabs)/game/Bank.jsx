import { ScrollView, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import Investment from "../../components/Bank/Investment.js";
import Upgrade from "../../components/Bank/Upgrade.js";

const bank = () => {
  return (
    <ImageBackground
      source={require("../../utils/backgrounds/BankBackground.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Investment />
        <Upgrade />
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

export default bank;
