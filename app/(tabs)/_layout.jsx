import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="operation"
        options={{
          tabBarLabel: "Operation",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="kitchen-set" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bank"
        options={{
          tabBarLabel: "Bank",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-trend-up" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payment" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="information"
        options={{
          tabBarLabel: "Info",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

// to remove header (operation, bank, expenses, information) -> screenOptions={{ headerShown: false }} inside Tabs on line 8
