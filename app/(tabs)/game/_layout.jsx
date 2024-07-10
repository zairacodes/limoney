import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6, MaterialIcons, Entypo } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Operation"
        options={{
          tabBarLabel: "Stand",
          tabBarIcon: ({ color }) => (
            <Entypo name="shop" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bank"
        options={{
          tabBarLabel: "Bank",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="money-bill-trend-up" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Expenses"
        options={{
          tabBarLabel: "Expenses",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payment" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Information"
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
