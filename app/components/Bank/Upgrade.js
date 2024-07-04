import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "../../context/UserContext";
import { Button } from "react-native-paper";
import { colours } from "../../utils/colours";

export default function Upgrade() {
  const { user, setUser } = useContext(UserContext);
  const [buttonOneDisabled, setButtonOneDisabled] = useState(false);
  const [buttonTwoDisabled, setButtonTwoDisabled] = useState(false);

  const handleBundleStock = () => {
    if (user.accountBalance >= 500) {
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - 500,
        lemonCount: prevUser.lemonCount + 100,
        waterCount: prevUser.waterCount + 100,
        sugarCount: prevUser.sugarCount + 100,
      }));
      setButtonOneDisabled(true);
    } else {
      alert("You do not have enough balance to upgrade your stock.");
    }
  };

  const handleBundleLemonade = () => {
    if (user.accountBalance >= 1000) {
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - 1000,
        lemonadeInStock: prevUser.lemonadeInStock + 100,
      }));
      setButtonTwoDisabled(true);
    } else {
      alert(
        "You do not have enough balance to upgrade your stock of lemonades."
      );
    }
  };

  return (
    <View>
      <View style={styles.box}>
        <Text style={styles.titleText}>Bundles for your Business:</Text>
        <View style={styles.upgradeListBox}>
          <View style={styles.leftCol}>
            <Text style={styles.upgradeItemsText}>Ingredients in Stock</Text>
          </View>
          <View style={styles.midCol}>
            <Text style={styles.upgradeItemsText}>+ 100</Text>
          </View>
          <View style={styles.rightCol}>
            <Button
              style={styles.button}
              disabled={buttonOneDisabled || user.accountBalance < 500}
              onPress={handleBundleStock}
            >
              £500
            </Button>
          </View>
        </View>
        <View style={styles.upgradeListBox}>
          <View style={styles.leftCol}>
            <Text style={styles.upgradeItemsText}>Lemonade in Stock</Text>
          </View>
          <View style={styles.midCol}>
            <Text style={styles.upgradeItemsText}>+ 100</Text>
          </View>
          <View style={styles.rightCol}>
            <Button
              style={styles.button}
              disabled={buttonTwoDisabled || user.accountBalance < 1000}
              onPress={handleBundleLemonade}
            >
              £1000
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
  upgradeListBox: {
    padding: 10,
    flexDirection: "row",
  },
  leftCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  midCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rightCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  upgradeItemsText: {
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
});
