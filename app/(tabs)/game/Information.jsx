import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext } from "react";
import { colours } from "../../utils/colours";
import { UserContext } from "../../context/UserContext";

const information = () => {
  const { user } = useContext(UserContext);

  return (
    <ImageBackground
      source={require("../../utils/backgrounds/InfoBackground.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          <Text style={styles.heading}>How To Play</Text>
          <Text style={styles.body}>
            Congratulations {user.username}! You are the proud new owner of the
            Limoney lemonade stand!
          </Text>
          <Text style={styles.body}>
            Your aim is to earn £100,000 by selling, upgrading and investing.
          </Text>
          <Text style={styles.body}>Now let's go through the basics:</Text>
          <Text style={styles.subheading}>Operation</Text>
          <Text style={styles.body}>
            This is where you can manage your business. See how well your
            lemonade is selling and make sure to buy more stock so that you
            don't run out! Running out of any ingredient means you can't make
            lemonade - and then you can't make money!
          </Text>
          <Text style={styles.subheading}>Bank</Text>
          <Text style={styles.body}>
            The bank is where to go when you want invest. Investments allow you
            to deposit some money and earn a percentage back after a period of
            time. This may take a while, and a big chunk of money, but will
            allow you to earn more in the long term.
          </Text>
          <Text style={styles.subheading}>Expenses</Text>
          <Text style={styles.body}>
            As a business owner you have some bills to pay...Rent and utilities
            allow your stand to be open and running. If you miss a payment then
            you will not be able to collect any more money, so remember to check
            in regularly and pay your bills on time!
          </Text>
          <Text style={styles.subheading}>Info</Text>
          <Text style={styles.body}>
            If you ever forget what you need to do, or are not sure how
            something works, you can find these instructions in the info tab.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: colours.paleYellow,
    margin: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  heading: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 30,
    textDecorationLine: "underline",
  },
  subheading: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  body: {
    padding: 20,
    fontSize: 15,
  },
});

export default information;
