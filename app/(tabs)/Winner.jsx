import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useContext } from "react";
import { colours } from "../utils/colours";
import { Button } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import { router } from "expo-router";

export default function Winner() {
  const { user } = useContext(UserContext);

  return (
    <ImageBackground
      source={require("../utils/backgrounds/winnerBackgroundTall.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <View style={styles.box}>
        <Text style={styles.mainTitleText}>Congratulations!</Text>
        <Text style={styles.titleText}>You earned £100,000!</Text>
        <Text style={styles.subtitleText}>Your Achievements:</Text>
        <View style={styles.innerBox}>
          <View style={styles.leftCol}>
            <Text style={styles.text}>Starting Balance:</Text>
            <Text style={styles.text}>Final Balance:</Text>
            <Text style={styles.text}>Total Profit:</Text>
            <Text style={styles.text}>Days Played:</Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.text}>£2000</Text>
            <Text style={styles.text}>£{user.accountBalance}</Text>
            <Text style={styles.text}>£{user.totalProfit}</Text>
            <Text style={styles.text}>{user.daysPlayed}</Text>
          </View>
        </View>
        <Button style={styles.button} onPress={() => router.push("/Login")}>
          Logout
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colours.paleYellow,
  },
  innerBox: {
    marginBottom: 20,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
  },
  mainTitleText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  leftCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightCol: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  subtitleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "20%",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    marginTop: "5%",
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
