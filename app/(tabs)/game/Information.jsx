import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import React from "react";
import InfoText from "../../components/Information/InfoText";

const information = () => {
  return (
    <ImageBackground
      source={require("../../utils/backgrounds/InfoBackground.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <InfoText />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default information;
