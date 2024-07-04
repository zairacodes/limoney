import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { UserContext } from "../../context/UserContext";
import { colours } from "../../utils/colours";

export default function Upgrade() {
  return (
    <View style={styles.box}>
      <Text>Upgrade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    backgroundColor: colours.paleYellow,
  },
});
