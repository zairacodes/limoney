import { DateContext } from '../context/DateContext'
import { View, Text, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'

export default function Date() {
    const { date, setDate } = useContext(DateContext)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    const [currentDay, setCurrentDay] = useState(date.day)
    const [currentMonth, setCurrentMonth] = useState(date.month)
    const [currentYear, setCurrentYear] = useState(date.year)
    const [maxDays, setMaxDays] = useState(31)

    useEffect(() => {
        currentDay < maxDays +1 && setTimeout(() => setCurrentDay(currentDay + 1), 1000)

        if (currentDay === maxDays +1) {
            if(currentMonth === 'December') setCurrentMonth('January')
            else setCurrentMonth(months[months.indexOf(currentMonth) + 1])
            setCurrentDay(1)
        }

        setDate({
            day: currentDay,
            month: currentMonth,
            year: currentYear
        })
    }, [currentDay]);

    useEffect(() => {
        if(currentMonth === 'January') setCurrentYear(currentYear + 1)

        if(months.indexOf(currentMonth) === 3 || months.indexOf(currentMonth) === 5 || months.indexOf(currentMonth) === 8 || months.indexOf(currentMonth) === 9) setMaxDays(30)
        else if(months.indexOf(currentMonth) === 1) setMaxDays(28)
        else setMaxDays(31)

        setDate({
            day: currentDay,
            month: currentMonth,
            year: currentYear
        })
    }, [currentMonth])

    return (
        <Text style={styles.date}>{date.day} {date.month} {date.year}</Text>
    )
}

const styles = StyleSheet.create({
    date: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15
    }
})
