import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import { router } from "expo-router";
import { colours } from "../utils/colours";

const login = () => {
  const { setUserId } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [username, onChangeUsername] = React.useState("");
  const [pwd, onChangePwd] = React.useState("");

  const handleConfirm = () => {
    const checkUserExist = users.find((user) => user.label === username);
    if (checkUserExist) {
      setUserId(checkUserExist.value);
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
    { label: "Lordzin", value: "2VYQnKwksn9qH3wehHR5" },
    { label: "Zgmartli", value: "8kZbYgeYvmYu6cQuM9Yr" },
    { label: "Milady", value: "CgGw2rPZlpgf7eHz97nT" },
    { label: "asdf", value: "davidchunghc" },
  ];

  return (
    <ImageBackground
      source={require("../utils/backgrounds/loginBackgroundwLogo.png")}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.keyboardContainer}
      >
        <View style={styles.loginContainer}>
          {!isLogin ? (
            <View style={styles.innerContainer}>
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
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    padding: 20,
    width: "90%",
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colours.paleYellow,
  },
  keyboardContainer: {
    padding: "100%",
  },
  input: {
    height: 40,
    margin: 7.5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
  },
  loginText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 7.5,
    width: "50%",
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});

export default login;
