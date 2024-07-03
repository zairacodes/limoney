import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/UserContext";

const StockList = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const sellLemonade = setInterval(() => {
      if (user.lemonadeInStock >= 1) {
        setUser((prevUser) => ({
          ...prevUser,
          lemonadeInStock: prevUser.lemonadeInStock - 1,
          accountBalance: prevUser.accountBalance + 20,
        }));
      }
    }, 5000); // lemonade sold every 5 seconds for testing

    return () => {
      clearInterval(sellLemonade);
    };
  }, [user.lemonadeInStock]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Lemonade in Stock: {user.lemonadeInStock}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>Stock List:</Text>
        <View style={styles.stockListContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.ingredientText}>
              Lemon: {user.lemonCount} ~ £3
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.button}
              disabled={user.accountBalance < 3}
              onPress={() => {
                setUser((prevUser) => ({
                  ...prevUser,
                  lemonCount: prevUser.lemonCount + 1,
                  accountBalance: prevUser.accountBalance - 3,
                }));
              }}
            >
              BUY
            </Button>
          </View>
        </View>
        <View style={styles.stockListContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.ingredientText}>
              Water: {user.waterCount} ~ £1
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.button}
              disabled={user.accountBalance < 1}
              onPress={() => {
                setUser((prevUser) => ({
                  ...prevUser,
                  waterCount: prevUser.waterCount + 1,
                  accountBalance: prevUser.accountBalance - 1,
                }));
              }}
            >
              BUY
            </Button>
          </View>
        </View>
        <View style={styles.stockListContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.ingredientText}>
              Sugar: {user.sugarCount} ~ £1
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.button}
              disabled={user.accountBalance < 1}
              onPress={() => {
                setUser((prevUser) => ({
                  ...prevUser,
                  sugarCount: prevUser.sugarCount + 1,
                  accountBalance: prevUser.accountBalance - 1,
                }));
              }}
            >
              BUY
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    // backgroundColor: "beige", // to be changed according to colours.js
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    // color: "darkorange", // to be changed according to colours.js
  },
  stockListContainer: {
    padding: 10,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ingredientText: {
    marginTop: "5%",
    fontSize: 18,
    // color: "darkorange", // to be changed according to colours.js
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "darkorange", // to be changed according to colours.js
  },
});

export default StockList;
