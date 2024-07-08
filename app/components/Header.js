import { useContext } from "react";
import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { UserContext } from "../context/UserContext";
import { ProgressBar, MD3Colors } from "react-native-paper";
import Date from "./Date";
import { colours } from "../utils/colours";
import { router } from "expo-router";

export default function Header() {
  const { user } = useContext(UserContext);
  const formattedAccBalance = Math.round(user.accountBalance);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>Account Balance: £{formattedAccBalance}</Text>
      <ProgressBar
        style={styles.progressBar}
        progress={formattedAccBalance}
        color={MD3Colors.error50}
      />
      <Date />
      <Button title="Logout" onPress={() => router.dismiss()} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colours.paleYellow,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  progressBar: {
    marginTop: 12,
  },
});
