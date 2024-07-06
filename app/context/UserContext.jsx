import { createContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../src/config/firebase";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export const UserContext = createContext(null); // Pass data

export const UserProvider = ({ children }) => {
  const initialState = {
    username: "Blalalala",
    accountBalance: 2000,
    totalProfit: 0,
    lemonCount: 0,
    sugarCount: 0,
    waterCount: 0,
    lemonadeInStock: 0,
    daysPlayed: 0,
    currentDate: {
      day: 1,
      month: "January",
      year: 2025,
    },
    investmentDetails: {
      currentValue: 0,
      initialInvestment: 0,
      interestEarned: 0,
      timeElapsed: 0,
    },
  };

  const [user, setUser] = useState(initialState);
  const [userId, setUserId] = useState(null); // Pass data
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const fetchDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue);
        setUser((prevUser) => ({
          ...prevUser,
          ...parsedData,
          currentDate: {
            ...prevUser.currentDate,
            ...parsedData.currentDate,
          },
          investmentDetails: {
            ...prevUser.investmentDetails,
            ...parsedData.investmentDetails,
          },
        }));
      }
    } catch (e) {
      console.error("Failed to load user data from storage", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromFirebase = (userId) => {
    if (!userId) return; // Pass data
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUser((prevUser) => ({
          ...prevUser,
          ...data,
          currentDate: {
            ...prevUser.currentDate,
            ...data.currentDate,
          },
          investmentDetails: {
            ...prevUser.investmentDetails,
            ...data.investmentDetails,
          },
        }));
      }
      setLoading(false);
      console.log("User data fetched from Firebase");
    });
    return unsub;
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        const unsub = fetchDataFromFirebase(userId);
        return () => unsub();
      } else {
        fetchDataFromStorage();
      }
    });
    return () => unsubscribe();
  }, [userId]); // Pass data

  const updateUserDataInFirebase = async (reason) => {
    if (!userId) return; // Pass data
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, user);
    console.log(`User data updated in Firebase due to: ${reason}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateUserDataInFirebase("interval");
    }, 60000);

    return () => clearInterval(interval);
  }, [user, isConnected]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        updateUserDataInFirebase(nextAppState);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [user, isConnected]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
