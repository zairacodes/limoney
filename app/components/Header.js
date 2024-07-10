import { useContext } from "react";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import { ProgressBar } from "react-native-paper";
import Date from "./Date";
import { colours } from "../utils/colours";
import { router } from "expo-router";

export default function Header() {
  const { user } = useContext(UserContext);
  const formattedAccBalance = Math.round(user.accountBalance);
  const percentageToGoal = formattedAccBalance / 100000;

  return (
    <View style={styles.header}>
      <Text style={styles.text}>Account Balance: £{formattedAccBalance}</Text>
      <ProgressBar
        style={styles.progressBar}
        progress={percentageToGoal}
        color={colours.green}
      />
      <Date />
      <Button style={styles.button} onPress={() => router.dismiss()}>
        Logout
      </Button>
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
  button: {
    marginTop: 10,
    width: "50%",
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});
