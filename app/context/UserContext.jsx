import { createContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../src/config/firebase";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { router, useNavigation } from "expo-router";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const initialState = {
    username: "Blalalala",
    accountBalance: 12345,
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
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [beenToWinner, setBeenToWinner] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);
  const navigation = useNavigation();
  const { routes, index } = navigation.getState();

  const [fulfillRent, setFulfillRent] = useState(false);
  const [fulfillUtitlies, setFulfillUtilities] = useState(false);
  const [fulfillTax, setFulfillTax] = useState(false);

  let currentRoute;

  if (index) {
    currentRoute = routes[index].name;
  }

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
    if (!userId) return;
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
  }, [userId]);

  const updateUserDataInFirebase = async (reason) => {
    if (!userId || isThrottled) {
      return;
    }
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, user);
      console.log(`User data updated in Firebase due to: ${reason}`);
      setIsThrottled(true);
      setTimeout(() => {
        setIsThrottled(false);
      }, 100000);
    } catch (error) {
      console.error("Failed to update user data in Firebase:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    updateUserDataInFirebase("user state change");
  }, [user]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log(`App state changed to: ${nextAppState}`);
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
  }, [userId, user]);

  if (
    user.accountBalance >= 100000 &&
    fulfillRent === true &&
    fulfillUtitlies === true &&
    fulfillTax === true &&
    beenToWinner === false &&
    currentRoute !== "(tabs)/Winner"
  ) {
    router.replace("/Winner");
    setBeenToWinner(true);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setUserId,
        setFulfillRent,
        setFulfillUtilities,
        setFulfillTax,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
