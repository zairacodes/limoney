import { DateContext } from "../context/DateContext";
import { View, Text, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { DaysPlayedContext } from "../context/DaysPlayedContext";

export default function Date() {
  const { date, setDate } = useContext(DateContext);
  const { daysPlayed, setDaysPlayed } = useContext(DaysPlayedContext);
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
  const [currentDay, setCurrentDay] = useState(date.day);
  const [currentMonth, setCurrentMonth] = useState(date.month);
  const [currentYear, setCurrentYear] = useState(date.year);
  const [maxDays, setMaxDays] = useState(31);

  useEffect(() => {
    currentDay < maxDays &&
      setTimeout(() => setCurrentDay(currentDay + 1), 1000);
    setDaysPlayed(daysPlayed + 1);

    if (currentDay === maxDays) {
      setTimeout(() => {
        if (currentMonth === "December") setCurrentMonth("January");
        else setCurrentMonth(months[months.indexOf(currentMonth) + 1]);
        setCurrentDay(1);
      }, 1000);
    }

    setDate({
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    });
  }, [currentDay]);

  useEffect(() => {
    if (currentMonth === "January" && daysPlayed >= 365)
      setCurrentYear(currentYear + 1);

    if (
      months.indexOf(currentMonth) === 3 ||
      months.indexOf(currentMonth) === 5 ||
      months.indexOf(currentMonth) === 8 ||
      months.indexOf(currentMonth) === 9
    )
      setMaxDays(30);
    else if (months.indexOf(currentMonth) === 1) setMaxDays(28);
    else setMaxDays(31);

    setDate({
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    });
  }, [currentMonth]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.date}>
        {date.day} {date.month} {date.year}
      </Text>
      <Text style={styles.date}>Total Days Played: {daysPlayed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
