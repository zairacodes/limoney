import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import { colours } from "../../utils/colours";

export default function StockList() {
  const { user, setUser } = useContext(UserContext);
  const [selling, setSelling] = useState(false);

  useEffect(() => {
    let sellLemonade;

    if (user.lemonadeInStock >= 1) {
      sellLemonade = setInterval(() => {
        setUser((prevUser) => ({
          ...prevUser,
          lemonadeInStock: prevUser.lemonadeInStock - 1,
          accountBalance: prevUser.accountBalance + 20,
        }));
      }, 5000); // lemonade sold every 5 seconds for testing
      setSelling(true);
    }

    return () => {
      clearInterval(sellLemonade);
      setSelling(false);
    };
  }, [user.lemonadeInStock]);

  return (
    <View>
      <View style={styles.box}>
        <Text style={styles.titleText}>
          Lemonade in Stock: {user.lemonadeInStock}
        </Text>
        {selling && (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Selling...</Text>
            <Image
              source={require("../../utils/LoadingGIF.gif")}
              style={styles.loadingGif}
            />
          </View>
        )}
      </View>
      <View style={styles.box}>
        <Text style={styles.titleText}>Stock List:</Text>
        <View style={styles.stockListBox}>
          <View style={styles.leftCol}>
            <Text style={styles.stockItemsText}>
              Lemon: {user.lemonCount} ~ £3
            </Text>
          </View>
          <View style={styles.rightCol}>
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
        <View style={styles.stockListBox}>
          <View style={styles.leftCol}>
            <Text style={styles.stockItemsText}>
              Water: {user.waterCount} ~ £1
            </Text>
          </View>
          <View style={styles.rightCol}>
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
        <View style={styles.stockListBox}>
          <View style={styles.leftCol}>
            <Text style={styles.stockItemsText}>
              Sugar: {user.sugarCount} ~ £1
            </Text>
          </View>
          <View style={styles.rightCol}>
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
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colours.paleYellow,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  stockListBox: {
    padding: 10,
    flexDirection: "row",
  },
  leftCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  stockItemsText: {
    marginTop: "5%",
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
  loadingBox: {
    alignItems: "center",
    marginTop: 5,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
  },
  loadingGif: {
    width: 60,
    height: 60,
  },
});
