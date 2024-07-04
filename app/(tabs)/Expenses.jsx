import { ImageBackground } from "react-native";
import React, { useState } from "react";
import ExpensesInfo from "../components/Expenses/ExpensesInfo.js";

const expenses = () => {
  const [rent, setRent] = useState(2000);
  const [utilities, setUtilities] = useState(500);
  return (
    <ImageBackground
      source={require("../utils/backgrounds/ExpensesBackground.png")}
      // style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <ExpensesInfo
        rent={rent}
        setRent={setRent}
        utilities={utilities}
        setUtilities={setUtilities}
      />
    </ImageBackground>
  );
};

export default expenses;
