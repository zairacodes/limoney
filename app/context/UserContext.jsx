import { createContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../src/config/firebase";
import { AppState } from "react-native";

export const UserContext = createContext(null); // Pass data

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Pass data
  const [user, setUser] = useState(null); // Pass data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return; // Pass data
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUser({
          username: data.username,
          accountBalance: data.accountBalance,
          lemonCount: data.lemonCount,
          sugarCount: data.sugarCount,
          waterCount: data.waterCount,
          totalProfit: data.totalProfit,
          lemonadeInStock: data.lemonadeInStock,
        });
        setLoading(false);
      }
    });
    return () => unsub();
  }, [userId]);

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
  }, [user]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background") {
        updateUserDataInFirebase("background");
      } else if (nextAppState === "inactive") {
        updateUserDataInFirebase("inactive");
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
