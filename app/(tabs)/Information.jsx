import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header.js";

const information = () => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Information page</Text>
    </SafeAreaView>
  );
};

export default information;
