import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { colours } from "../../utils/colours";

export default function InfoText() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.box}>
      <Text style={styles.heading}>How To Play</Text>
      <Text style={styles.body}>
        Congratulations {user.username}! You are the proud new owner of the
        Limoney lemonade stand!
      </Text>
      <Text style={styles.body}>
        Your aim is to earn £100,000 by selling consistently and making smart
        investments.
      </Text>
      <Text style={styles.body}>Now let's break down the basics...</Text>
      <Text style={styles.subheading}>🍋 Stand 🍋</Text>
      <Text style={styles.body}>Keep an Eye on Sales and Stock</Text>
      <Text style={styles.body}>
        Always make sure you have enough lemons, sugar, and water. If you run
        out of any of these, you can't make lemonade, and you won't make any
        money!
      </Text>
      <Text style={styles.subheading}>💵 Bank 💵</Text>
      <Text style={styles.body}>Invest Your Money</Text>
      <Text style={styles.body}>
        Put some of your money in the bank to invest. Investments will grow over
        time and give you more money back later. It might take a while and need
        a lot of money at first, but investing is a great way to make more money
        in the future.
      </Text>
      <Text style={styles.subheading}>💸 Expenses 💸</Text>
      <Text style={styles.body}>Pay Your Bills and Taxes</Text>
      <Text style={styles.body}>
        As a business owner, you have to pay rent and utilities to keep your
        stand open. Plus, you have to pay taxes on your profits. If you forget
        to pay, your stand might close, and you won't be able to sell lemonade
        anymore. So, remember to pay your bills and taxes on time!
      </Text>
      <Text style={styles.body}>Prepare for Unexpected Events</Text>
      <Text style={styles.body}>
        Unexpected expenses can occur at any time. Having a financial cushion
        ensures you can handle these surprises without disrupting your business.
        So, always set aside some funds for those rainy days!
      </Text>
      <Text style={styles.subheading}>ℹ️ Info ℹ️</Text>
      <Text style={styles.body}>Help and Instructions</Text>
      <Text style={styles.body}>
        If you ever forget what you need to do, or are not sure how something
        works, you can find these instructions in the info tab.
      </Text>
    </View>
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
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  subheading: {
    marginTop: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    padding: 5,
    marginTop: "2.5%",
    fontSize: 18,
    textAlign: "justify",
  },
});
