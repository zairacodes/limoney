import { ScrollView, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import Header from "../components/Header.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Investment from "../components/Bank/Investment.js";
import Upgrade from "../components/Bank/Upgrade.js";
import { colours } from "../utils/colours.js";

const bank = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../utils/backgrounds/BankBackground.png")}
        style={styles.container}
      >
        <ScrollView>
          <Header />
          <Investment />
          <Upgrade />
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

export default bank;
