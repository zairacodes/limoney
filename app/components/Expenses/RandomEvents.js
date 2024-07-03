import React, { useEffect, useState, useContext } from "react";
import { Alert } from "react-native";
import { UserContext } from "../../context/UserContext";

export default function RandomEvents({ setTransactionHistory }) {
  const { user, setUser } = useContext(UserContext);

  const randomEvents = [
    {
      type: "Bad Weather",
      message: "A sudden thunderstorm hits, forcing you to close early.",
      cost: 50,
    },
    {
      type: "Supply Shortage",
      message: "You ran out of lemons and had to buy more at a higher price.",
      cost: 30,
    },
    {
      type: "Equipment Failure",
      message: "Your juicer broke down and needs immediate repair.",
      cost: 75,
    },
    {
      type: "Health Inspection",
      message:
        "A health inspector visited and required you to make improvements.",
      cost: 40,
    },
    {
      type: "Customer Complaint",
      message:
        "A customer complained about the lemonade, offering a free drink as compensation.",
      cost: 5,
    },
    {
      type: "Marketing Boost",
      message: "You decided to invest in flyers to boost sales.",
      cost: 20,
    },
    {
      type: "Stolen Goods",
      message: "Someone stole a batch of your lemons.",
      cost: 25,
    },
    {
      type: "Price Increase",
      message: "The price of sugar increased unexpectedly.",
      cost: 10,
    },
    {
      type: "New Competition",
      message: "A new lemonade stand opened nearby, reducing your sales.",
      cost: 20,
    },
    {
      type: "Regulatory Fee",
      message: "You had to pay a small regulatory fee.",
      cost: 15,
    },
    {
      type: "Community Support",
      message: "The community showed support and bought more lemonade!",
      revenue: 30,
    },
    {
      type: "Staff Illness",
      message: "One of your helpers fell sick, and you had to manage alone.",
      cost: 20,
    },
  ];

  const triggerRandomEvent = () => {
    const randomEvent =
      randomEvents[Math.floor(Math.random() * randomEvents.length)];

    if (randomEvent.revenue) {
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance + randomEvent.revenue,
      }));
      logTransaction(randomEvent.type, +randomEvent.revenue);
      Alert.alert(
        randomEvent.type,
        `${randomEvent.message} Revenue: £${randomEvent.revenue}`
      );
    } else {
      if (user.accountBalance >= randomEvent.cost) {
        setUser((prevUser) => ({
          ...prevUser,
          accountBalance: prevUser.accountBalance - randomEvent.cost,
        }));
        logTransaction(randomEvent.type, -randomEvent.cost);
        Alert.alert(
          randomEvent.type,
          `${randomEvent.message} Cost: £${randomEvent.cost}`
        );
      } else {
        Alert.alert(
          randomEvent.type,
          `${randomEvent.message} However, you do not have enough balance to cover the cost of £${randomEvent.cost}.`
        );
      }
    }
  };

  const logTransaction = (description, amount) => {
    const date = new Date().toLocaleString();
    const newTransaction = { description, amount, date };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
  };

  useEffect(() => {
    const interval = setInterval(triggerRandomEvent, 30000);
    return () => clearInterval(interval);
  }, []);
}
