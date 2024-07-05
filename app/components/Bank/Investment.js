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

  useEffect(() => {
    let timer;
    if (isInvesting) {
      if (!startTime) {
        setStartTime(new Date());
      }
      timer = setInterval(() => {
        setInvestedAmount((prevAmount) => prevAmount * 1.02);
        setTimeElapsed(calculateTimeElapsed);
      }, 60000);
    }
    return () => clearInterval(timer);
  }, [isInvesting, startTime]);

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
        accountBalance: (prevUser.accountBalance - investmentValue).toFixed(2),
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
        currentValue: null,
        initialInvestment: null,
        interestEarned: null,
        timeElapsed: null,
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
      const elapsed = Math.floor((now - startTime) / 60000);
      return elapsed;
    }
    return 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.box}>
          <Text style={styles.label}>Investment (2% every 1 min)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            onChangeText={(value) => setInvestment(value)}
            value={investment}
          />
          <Button
            style={styles.button}
            onPress={handleInvest}
            disabled={isInvesting}
          >
            INVEST
          </Button>
          {isInvesting && (
            <>
              <Button style={styles.button} onPress={handleRedeem}>
                REDEEM
              </Button>
              <View style={styles.infoContainer}>
                <Text style={styles.info}>
                  Initial Investment: £{initialInvestment}
                </Text>
                <Text style={styles.info}>
                  Current Value: £{investedAmount.toFixed(2)}
                </Text>
                <Text style={styles.info}>
                  Interest Earned: £
                  {(investedAmount - initialInvestment).toFixed(2)}
                </Text>
                <Text style={styles.info}>Time Elapsed: {timeElapsed} min</Text>
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
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});
