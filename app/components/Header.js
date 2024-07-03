import { useContext } from "react";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AccountContext } from "../context/AccountContext";
import { ProgressBar, MD3Colors } from "react-native-paper";

export default function Header() {
  const { accBalance } = useContext(AccountContext);
  const formattedAccBalance = Math.round(accBalance);
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Account Balance: £{formattedAccBalance}</Text>
      <ProgressBar
        style={styles.progressBar}
        progress={0.5}
        color={MD3Colors.error50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  progressBar: {
    marginTop: 12,
  },
});
