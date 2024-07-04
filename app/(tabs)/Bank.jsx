import { ScrollView, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import Header from "../components/Header.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Investment from "../components/Bank/Investment.js";
import Upgrade from "../components/Bank/Upgrade.js";

const bank = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../utils/backgrounds/BankBackground.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default bank;
