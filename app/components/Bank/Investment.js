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
  const maxTime = 10; // 10 sec for testing, then change to 180 sec = 180 days = 6 months investment

  useEffect(() => {
    let timer;
    if (isInvesting && timeElapsed < maxTime) {
      if (!startTime) {
        setStartTime(new Date());
      }
      timer = setInterval(() => {
        setInvestedAmount((prevAmount) => prevAmount * 1.000136); // 0.01% per day
        setTimeElapsed(calculateTimeElapsed);
      }, 1000); // 1 sec
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
      const elapsed = Math.floor((now - startTime) / 1000); // 60000 = 1 min 10000 = 10 secs
      return elapsed;
    }
    return 0;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.box}>
          <Text style={styles.label}>Investment (5% per year)</Text>
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
                <Text style={styles.info}>
                  Time Elapsed: {timeElapsed} days
                </Text>
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
