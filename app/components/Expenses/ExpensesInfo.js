import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { colours } from "../../utils/colours";
import Tax from "./Tax";
import RandomEvents from "./RandomEvents";
import { UserContext } from "../../context/UserContext";

export default function ExpensesInfo({
  rent,
  setRent,
  setUtilities,
  utilities,
}) {
  const { user, setUser } = useContext(UserContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [paidMonths, setPaidMonths] = useState([]);
  const [paidUtilitiesMonths, setPaidUtilitiesMonths] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (user.currentDate.month === "January") {
      setPaidMonths([]);
      setPaidUtilitiesMonths([]);
    }
  }, [user.currentDate.month]);

  useEffect(() => {
    if (user.accountBalance <= 0) {
      Alert.alert(
        "Game Over",
        "Your account balance is zero or below. Game over!"
      );
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: 0,
      }));
    }
  }, [user.accountBalance]);

  const payRent = () => {
    if (user.accountBalance >= rent) {
      logTransaction("Rent payment", rent);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - rent,
      }));
      setPaidMonths((prev) => [...prev, user.currentDate.month]);
      setRent(2000);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the rent."
      );
    }
  };

  const payUtilities = () => {
    if (user.accountBalance >= utilities) {
      logTransaction("Utilities payment", utilities);
      setUser((prevUser) => ({
        ...prevUser,
        accountBalance: prevUser.accountBalance - utilities,
      }));
      setPaidUtilitiesMonths((prev) => [...prev, user.currentDate.month]);
      setUtilities(500);
    } else {
      Alert.alert(
        "Insufficient funds",
        "You do not have enough balance to pay the utilities."
      );
    }
  };

  const logTransaction = (description, amount) => {
    const newTransaction = {
      description,
      amount,
      date: `${user.currentDate.day} ${user.currentDate.month} ${user.currentDate.year}`,
    };
    setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
  };

  const renderMonthItem = (item, type) => {
    const isRentPaid = paidMonths.includes(item);
    const isUtilitiesPaid = paidUtilitiesMonths.includes(item);

    return (
      <View key={item} style={styles.monthContainer}>
        <Text style={styles.monthText}>{item}: </Text>
        {type === "Rent" && (
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                isRentPaid ? styles.paid : styles.pending,
              ]}
            >
              Rent {isRentPaid ? "paid" : "pending"}
            </Text>
          </View>
        )}
        {type === "Utilities" && (
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                isUtilitiesPaid ? styles.paid : styles.pending,
              ]}
            >
              Utilities {isUtilitiesPaid ? "paid" : "pending"}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.box}>
        <RandomEvents setTransactionHistory={setTransactionHistory} />
        <View style={styles.rentContainer}>
          <Text style={styles.text}>Rent: {rent}</Text>
          <Button
            style={styles.button}
            onPress={payRent}
            disabled={paidMonths.includes(user.currentDate.month)}
          >
            PAY THE RENT
          </Button>
        </View>
        <View>{months.map((item) => renderMonthItem(item, "Rent"))}</View>
      </View>
      <View style={styles.box}>
        <View>
          <Text style={styles.text}>Utilities: {utilities}</Text>
          <Button
            style={styles.button}
            title="Pay Utilities"
            onPress={payUtilities}
            disabled={paidUtilitiesMonths.includes(user.currentDate.month)}
          >
            PAY UTILITIES
          </Button>
        </View>
        <View>{months.map((item) => renderMonthItem(item, "Utilities"))}</View>
      </View>
      <Tax
        transactionHistory={transactionHistory}
        setTransactionHistory={setTransactionHistory}
      />
      <View style={styles.box}>
        <Text style={styles.text}>Payment History</Text>
        <ScrollView style={styles.scrollView}>
          {transactionHistory.map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <Text>
                {item.date} - {item.description}: £{item.amount}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: colours.paleYellow,
  },
  rentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingRight: 10,
    fontSize: 18,
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  monthText: {
    fontSize: 16,
  },
  statusContainer: {
    marginLeft: 10,
  },
  statusText: {
    fontSize: 16,
  },
  paid: {
    color: "green",
  },
  pending: {
    color: "red",
  },
  scrollView: {
    marginTop: 10,
    maxHeight: 200,
  },
  transactionItem: {
    paddingVertical: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colours.yellow,
  },
});

// import React, { useEffect, useState, useContext } from "react";
// import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
// import { Button } from "react-native-paper";
// import { colours } from "../../utils/colours";
// import Tax from "./Tax";
// import RandomEvents from "./RandomEvents";
// import { UserContext } from "../../context/UserContext";

// export default function ExpensesInfo({
//   rent,
//   setRent,
//   setUtilities,
//   utilities,
// }) {
//   const { user, setUser } = useContext(UserContext);
//   const [transactionHistory, setTransactionHistory] = useState([]);
//   const [paidMonths, setPaidMonths] = useState([]);
//   const [paidUtilitiesMonths, setPaidUtilitiesMonths] = useState([]);
//   const [missedRentPayments, setMissedRentPayments] = useState([]);
//   const [missedUtilitiesPayments, setMissedUtilitiesPayments] = useState([]);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   //     user.currentDate.month >>> September
//   //    months.indexOf(user.currentDate.month) >>> 8
//   //    indexOfPreviousMonth >>>>>>>....7

//   //const previousMonth = months[months.indexOf(user.currentDate.month) - 1]
//   // const totalRentDue = rent * (missedRentPayments.length + 1);

//   // if (!paidMonths.includes(previousMonth)) {
//   //   setMissedRentPayments((prev) => [...prev, previousMonth]);
//   //  }

//   useEffect(() => {
//     if (user.currentDate.month === "January") {
//       setPaidMonths([]);
//       setPaidUtilitiesMonths([]);
//     }
//   }, [user.currentDate.month]);

//   useEffect(() => {
//     if (user.accountBalance <= 0) {
//       Alert.alert(
//         "Game Over",
//         "Your account balance is zero or below. Game over!"
//       );
//       setUser((prevUser) => ({
//         ...prevUser,
//         accountBalance: 0,
//       }));
//       //  further logic here for game over
//     }
//   }, [user.accountBalance]);

//   const payRent = () => {
//     if (user.accountBalance >= rent) {
//       logTransaction("Rent payment", rent);
//       setUser((prevUser) => ({
//         ...prevUser,
//         accountBalance: prevUser.accountBalance - rent,
//       }));
//       setPaidMonths((prev) => [...prev, user.currentDate.month]);
//       setRent(2000);
//       // setMissedRentPayments((prev) =>
//       //   prev.filter((month) => month !== user.currentDate.month)
//       // );
//     } else {
//       Alert.alert(
//         "Insufficient funds",
//         "You do not have enough balance to pay the rent."
//       );
//     }
//   };

//   const payUtilities = () => {
//     if (user.accountBalance >= utilities) {
//       logTransaction("Utilities payment", utilities);
//       setUser((prevUser) => ({
//         ...prevUser,
//         accountBalance: prevUser.accountBalance - utilities,
//       }));
//       setPaidUtilitiesMonths((prev) => [...prev, user.currentDate.month]);
//       setUtilities(500);
//       // setMissedUtilitiesPayments((prev) =>
//       //   prev.filter((month) => month !== user.currentDate.month)
//       // );
//     } else {
//       Alert.alert(
//         "Insufficient funds",
//         "You do not have enough balance to pay the utilities."
//       );
//     }
//   };

//   const logTransaction = (description, amount) => {
//     const newTransaction = {
//       description,
//       amount,
//       date: `${user.currentDate.day} ${user.currentDate.month} ${user.currentDate.year}`,
//     };
//     setTransactionHistory((prevHistory) => [newTransaction, ...prevHistory]);
//   };

//   const renderMonthItem = (item) => {
//     const isRentPaid = paidMonths.includes(item);
//     const isUtilitiesPaid = paidUtilitiesMonths.includes(item);

//     // const isRentMissed = !isRentPaid && missedRentPayments.includes(item);
//     // const isUtilitiesMissed =
//     //   !isUtilitiesPaid && missedUtilitiesPayments.includes(item);

//     return (
//       <View key={item} style={styles.monthContainer}>
//         <Text style={styles.monthText}>{item}: </Text>
//         <View style={styles.statusContainer}>
//           <Text
//             style={[
//               styles.statusText,
//               isRentPaid ? styles.paid : styles.pending,
//             ]}
//           >
//             Rent {isRentPaid ? "paid" : "pending"}
//           </Text>
//         </View>
//         <View style={styles.statusContainer}>
//           <Text
//             style={[
//               styles.statusText,
//               isUtilitiesPaid ? styles.paid : styles.pending,
//             ]}
//           >
//             Utilities {isUtilitiesPaid ? "paid" : "pending"}
//           </Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View>
//       <View style={styles.box}>
//         <RandomEvents setTransactionHistory={setTransactionHistory} />
//         <View style={styles.rentContainer}>
//           <Text style={styles.text}>Rent: {rent}</Text>
//           <Button
//             style={styles.button}
//             onPress={payRent}
//             disabled={paidMonths.includes(user.currentDate.month)}
//           >
//             PAY THE RENT
//           </Button>
//         </View>
//         <View>{months.map(renderMonthItem)}</View>
//       </View>
//       <View style={styles.box}>
//         <View>
//           <Text style={styles.text}>Utilities: {utilities}</Text>
//           <Button
//             style={styles.button}
//             title="Pay Utilities"
//             onPress={payUtilities}
//             disabled={paidUtilitiesMonths.includes(user.currentDate.month)}
//           >
//             PAY UTILITIES
//           </Button>
//         </View>
//       </View>
//       <Tax
//         transactionHistory={transactionHistory}
//         setTransactionHistory={setTransactionHistory}
//       />
//       <View style={styles.box}>
//         <Text style={styles.text}>Payment History</Text>
//         <ScrollView style={styles.scrollView}>
//           {transactionHistory.map((item, index) => (
//             <View key={index} style={styles.transactionItem}>
//               <Text>
//                 {item.date} - {item.description}: £{item.amount}
//               </Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   box: {
//     flex: 1,
//     margin: 10,
//     padding: 20,
//     borderWidth: 1,
//     borderRadius: 20,
//     backgroundColor: colours.paleYellow,
//   },
//   rentContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   text: {
//     paddingRight: 10,
//     fontSize: 18,
//   },
//   monthContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   monthText: {
//     fontSize: 16,
//   },
//   statusContainer: {
//     marginLeft: 10,
//   },
//   statusText: {
//     fontSize: 16,
//   },
//   paid: {
//     color: "green",
//   },
//   pending: {
//     color: "red",
//   },
//   scrollView: {
//     marginTop: 10,
//     maxHeight: 200,
//   },
//   transactionItem: {
//     paddingVertical: 5,
//   },
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: "5%",
//     borderRadius: 50,
//     borderWidth: 1,
//     backgroundColor: colours.yellow,
//   },
// });
