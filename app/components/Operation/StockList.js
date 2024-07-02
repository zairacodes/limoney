import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { AccountContext } from "../../context/AccountContext";

const StockList = () => {
  const { accBalance, setAccBalance } = useContext(AccountContext);
  const [lemonadeInStock, setLemonadeInStock] = useState(3); // 3 lemonades in stock to start with for testing
  const [lemonStock, setLemonStock] = useState(0);
  const [waterStock, setWaterStock] = useState(0);
  const [sugarStock, setSugarStock] = useState(0);

  useEffect(() => {
    const makeLemonade = setInterval(() => {
      if (lemonStock >= 1 && waterStock >= 4 && sugarStock >= 3) {
        setLemonadeInStock((currLemonadeInStock) => currLemonadeInStock + 1);
        setLemonStock((currLemonStock) => currLemonStock - 1);
        setWaterStock((currWaterStock) => currWaterStock - 4);
        setSugarStock((currSugarStock) => currSugarStock - 3);
      }
    }, 5000); // lemonade produced every 5 seconds for testing

    return () => {
      clearInterval(makeLemonade);
    };
  }, [lemonStock, waterStock, sugarStock]);

  useEffect(() => {
    const sellLemonade = setInterval(() => {
      if (lemonadeInStock >= 1) {
        setLemonadeInStock((currLemonadeInStock) => currLemonadeInStock - 1);
        setAccBalance((currAccBalance) => currAccBalance + 20); // recover £10 total costs and earn £10 profit
      }
    }, 6000); // lemonade sold every 6 seconds for testing

    return () => {
      clearInterval(sellLemonade);
    };
  }, [lemonadeInStock]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Lemonade in Stock: {lemonadeInStock}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>Stock List:</Text>
        <View style={styles.stockListContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.ingredientText}>Lemon: {lemonStock} ~ £3</Text>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.button}
              disabled={accBalance < 3}
              onPress={() => {
                setLemonStock(lemonStock + 1), setAccBalance(accBalance - 3);
              }}
            >
              BUY
            </Button>
          </View>
        </View>
        <View style={styles.stockListContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.ingredientText}>Water: {waterStock} ~ £1</Text>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.button}
              disabled={accBalance < 1}
              onPress={() => {
                setWaterStock(waterStock + 1), setAccBalance(accBalance - 1);
              }}
            >
              BUY
            </Button>
          </View>
        </View>
        <View style={styles.stockListContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.ingredientText}>Sugar: {sugarStock} ~ £1</Text>
          </View>
          <View style={styles.rightContainer}>
            <Button
              style={styles.button}
              disabled={accBalance < 1}
              onPress={() => {
                setSugarStock(sugarStock + 1), setAccBalance(accBalance - 1);
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
