import { View, Text, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function DateComponent() {
  const { user, setUser } = useContext(UserContext);
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

  const [currentDay, setCurrentDay] = useState(user.currentDate.day);
  const [currentMonth, setCurrentMonth] = useState(user.currentDate.month);
  const [currentYear, setCurrentYear] = useState(user.currentDate.year);
  const [maxDays, setMaxDays] = useState(31);

  const calculateMaxDays = (month, year) => {
    const daysInMonth = {
      January: 31,
      February:
        year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31,
    };
    return daysInMonth[month];
  };

  useEffect(() => {
    setMaxDays(calculateMaxDays(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentDay < maxDays) {
        setCurrentDay(currentDay + 1);
      } else {
        setCurrentDay(1);
        if (currentMonth === "December") {
          setCurrentMonth("January");
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(months[months.indexOf(currentMonth) + 1]);
        }
      }

      setUser((prevUser) => ({
        ...prevUser,
        daysPlayed: prevUser.daysPlayed + 1,
        currentDate: {
          day: currentDay < maxDays ? currentDay + 1 : 1,
          month:
            currentDay < maxDays
              ? currentMonth
              : currentMonth === "December"
              ? "January"
              : months[months.indexOf(currentMonth) + 1],
          year:
            currentDay < maxDays
              ? currentYear
              : currentMonth === "December"
              ? currentYear + 1
              : currentYear,
        },
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentDay, currentMonth, currentYear, maxDays]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {currentDay} {currentMonth} {currentYear}
      </Text>
      <Text style={styles.date}>Total Days Played: {user.daysPlayed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
