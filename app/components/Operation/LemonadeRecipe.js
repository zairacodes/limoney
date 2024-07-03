import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/UserContext";

const LemonadeRecipe = () => {
  const { user, setUser } = useContext(UserContext);

  const makeLemonade = () => {
    if (user.lemonCount >= 1 && user.waterCount >= 4 && user.sugarCount >= 3) {
      setUser((prevUser) => ({
        ...prevUser,
        lemonadeInStock: prevUser.lemonadeInStock + 1,
        lemonCount: prevUser.lemonCount - 1,
        waterCount: prevUser.waterCount - 4,
        sugarCount: prevUser.sugarCount - 3,
      }));
    } else {
      alert("You do not have enough ingredients in stock to make lemonade.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Lemonade Recipe:</Text>
      <Text style={styles.ingredientText}>Lemon x 1</Text>
      <Text style={styles.ingredientText}>Water x 4</Text>
      <Text style={styles.ingredientText}>Sugar x 3</Text>
      <Button style={styles.button} onPress={makeLemonade}>
        MAKE LEMONADE
      </Button>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "darkorange", // to be changed according to colours.js
  },
});

export default LemonadeRecipe;
