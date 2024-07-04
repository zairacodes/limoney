import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colours } from "../../utils/colours";

const Upgrade = () => {
  return (
    <View style={styles.box}>
      <Text>Upgrade</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    backgroundColor: colours.paleYellow,
  },
});
export default Upgrade;
