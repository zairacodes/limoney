import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../context/UserContext"; //Pass data
import { router } from "expo-router";
import { colours } from "../utils/colours";

const login = () => {
  const { setUserId } = useContext(UserContext); //Pass data
  const [isLogin, setIsLogin] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [username, onChangeUsername] = React.useState("");
  const [pwd, onChangePwd] = React.useState("");

  const handleConfirm = () => {
    const checkUserExist = users.find((user) => user.label === username);
    if (checkUserExist) {
      setUserId(checkUserExist.value); //Pass data
      router.push("/game");
    } else {
      Alert.alert("Invalid User");
    }
  };

  const handleLogout = () => {
    setIsLogin(false);
    setSelectedUserId(null);
    setSelectedUserName(null);
  };

  const users = [
    { label: "QueenBarbara", value: "vSHbPyV82Y4As0rEVWJG" },
    { label: "Lord Voldmort", value: "2VYQnKwksn9qH3wehHR5" },
    { label: "Zgmartli", value: "8kZbYgeYvmYu6cQuM9Yr" },
    { label: "Milady", value: "CgGw2rPZlpgf7eHz97nT" },
    { label: "davidchung", value: "davidchunghc" },
    { label: "asdf", value: "davidchunghc" },
  ];

  return (
    <SafeAreaView style={styles.loginContainer}>
      {!isLogin ? (
        <View style={styles.innerContainer}>
          <Image source={require("../utils/Limoney.png")} style={styles.logo} />
          <Text style={styles.loginText}>
            Please Enter Your Username and Password
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Username"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onChangePwd}
            value={pwd}
            placeholder="Password"
          />
          <Button style={styles.button} onPress={handleConfirm}>
            Confirm
          </Button>
        </View>
      ) : (
        <View>
          <Text>Welcome! {selectedUserName} !</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "50%",
    resizeMode: "center",
    marginTop: "-50%",
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  loginText: {
    margin: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});

export default login;
