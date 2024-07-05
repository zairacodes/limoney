import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker"; // run npm install react-native-picker/picker
import { UserContext } from "../context/UserContext"; //Pass data

const login = () => {
  const { setUserId } = useContext(UserContext); //Pass data
  const [isLogin, setIsLogin] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);

  const handleConfirm = () => {
    if (selectedUserId) {
      const selectedUser = users.find((user) => user.value === selectedUserId);
      setSelectedUserName(selectedUser.label);
      setUserId(selectedUserId); //Pass data
      setIsLogin(true);
      console.log("selectedUserId >>>", selectedUserId); //Pass data
      console.log("setUserId >>>", setUserId); //Pass data
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
  ];

  return (
    <SafeAreaView style={styles.loginContainer}>
      {!isLogin ? (
        <View style={styles.innerContainer}>
          <Text>Please select your name:</Text>
          <Picker
            style={styles.loginPickerStyles}
            selectedValue={selectedUserId}
            onValueChange={(itemValue) => setSelectedUserId(itemValue)}
          >
            <Picker.Item label="Select a user" value={null} />
            {users.map((user) => (
              <Picker.Item
                key={user.value}
                label={user.label}
                value={user.value}
              />
            ))}
          </Picker>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            disabled={!selectedUserId}
          />
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
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "80%",
  },
  loginPickerStyles: {
    width: "100%",
    backgroundColor: "gray",
    color: "white",
  },
});

export default login;
