import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import { colours } from "../../utils/colours";

export default function Investment() {
  const { user, setUser } = useContext(UserContext);
  const [investment, setInvestment] = useState("");
  const [initialInvestment, setInitialInvestment] = useState(
    user.investmentDetails.initialInvestment
  );
  const [investedAmount, setInvestedAmount] = useState(
    user.investmentDetails.currentValue
  );
  const [isInvesting, setIsInvesting] = useState(
    user.investmentDetails.currentValue ? true : false
  );
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(
    user.investmentDetails.timeElapsed
  );
  const [investmentEnded, setInvestmentEnded] = useState(false);
  const maxTime = 180;

  useEffect(() => {
    let timer;
    if (isInvesting && timeElapsed < maxTime) {
      if (!startTime) {
        setStartTime(new Date());
      }
      timer = setInterval(() => {
        setInvestedAmount((prevAmount) => prevAmount * 1.000136);
        setTimeElapsed(calculateTimeElapsed);
      }, 1000);
    } else {
      setInvestmentEnded(true);
    }
    return () => clearInterval(timer);
  }, [isInvesting, startTime, timeElapsed, investmentEnded]);

  useEffect(() => {
    if (isInvesting) {
      setUser((prevUser) => ({
        ...prevUser,
        investmentDetails: {
          currentValue: investedAmount,
          initialInvestment: initialInvestment,
          interestEarned: (investedAmount - initialInvestment).toFixed(2),
          timeElapsed: timeElapsed,
        },
      }));
    }
  }, [investedAmount, timeElapsed, isInvesting]);

  const handleInvest = () => {
    const investmentValue = Number(investment);
    if (investmentValue > 0 && investmentValue <= user.accountBalance) {
      setInvestedAmount(investmentValue);
      setInitialInvestment(investmentValue);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: Number((prevUser.accountBalance - investmentValue).toFixed(2)),
      }));
      setIsInvesting(true);
      setInvestment("");
      Keyboard.dismiss();
    }
  };

  const handleRedeem = () => {
    setUser((prevUser) => ({
      ...prevUser,
      accountBalance: (
        Number(prevUser.accountBalance) + investedAmount
      ).toFixed(2),
      investmentDetails: {
        currentValue: 0,
        initialInvestment: 0,
        interestEarned: 0,
        timeElapsed: 0,
      },
    }));
    setInvestedAmount(0);
    setIsInvesting(false);
    setStartTime(null);
    setTimeElapsed(0);
  };

  const calculateTimeElapsed = () => {
    if (startTime) {
      const now = new Date();
      const elapsed = Math.floor((now - startTime) / 1000);
      return elapsed;
    }
    return 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.box}>
          <Text style={styles.label}>Investment:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            onChangeText={(value) => setInvestment(value)}
            value={investment}
          />
          {!isInvesting && (
            <Button
              style={styles.button}
              onPress={handleInvest}
              disabled={isInvesting}
            >
              INVEST
            </Button>
          )}
          {isInvesting && (
            <>
              <View style={styles.infoContainer}>
                <View style={styles.innerBox}>
                  <View style={styles.leftCol}>
                    <Text style={styles.info}>Initial Investment:</Text>
                    <Text style={styles.info}>Current Value:</Text>
                    <Text style={styles.info}>Interest Earned:</Text>
                    <Text style={styles.info}>Redeem in:</Text>
                  </View>
                  <View style={styles.rightCol}>
                    <Text style={styles.info}>£{initialInvestment}</Text>
                    <Text style={styles.info}>
                      £{investedAmount.toFixed(2)}
                    </Text>
                    <Text style={styles.info}>
                      £{(investedAmount - initialInvestment).toFixed(2)}
                    </Text>
                    <Text style={styles.info}>
                      {maxTime - timeElapsed} days
                    </Text>
                  </View>
                </View>
                <View style={styles.redeemContainer}>
                  {investmentEnded && timeElapsed === maxTime && (
                    <>
                      <Text style={styles.redeemNote}>
                        Investment period ended. Please redeem your money.
                      </Text>
                      <Button style={styles.button} onPress={handleRedeem}>
                        REDEEM
                      </Button>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  label: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 16,
  },
  infoContainer: {
    marginTop: 12,
    padding: 10,
    paddingBottom: -10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
  },
  innerBox: {
    borderColor: "#ddd",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  leftCol: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "60%",
  },
  rightCol: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "40%",
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  redeemContainer: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  redeemNote: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  button: {
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});
