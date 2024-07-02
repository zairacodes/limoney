import { View, Text, StyleSheet } from "react-native";
import React from "react";

const LemonadeRecipe = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Lemonade Recipe:</Text>
      <Text style={styles.ingredientText}>Lemon x 1</Text>
      <Text style={styles.ingredientText}>Water x 4</Text>
      <Text style={styles.ingredientText}>Sugar x 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderWidth: 1,
    // borderColor: "black", // to be changed according to colours.js
    // backgroundColor: "beige", // to be changed according to colours.js
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    // color: "darkorange", // to be changed according to colours.js
  },
  ingredientText: {
    marginTop: "5%",
    fontSize: 18,
    // color: "darkorange", // to be changed according to colours.js
  },
});

export default LemonadeRecipe;
