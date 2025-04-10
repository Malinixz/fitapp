import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Colors } from '@/styles/Colors';

interface DateSelectorProps {
    date: string;
    onDateChange: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, onDateChange }) => {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date(date));
    
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDatePick = (date: Date) => {
        onDateChange(date);
        setCurrentDate(date);
        hideDatePicker();
    };

    const handlePreviousDay = () => {
        const previousDay = new Date(currentDate);
        previousDay.setDate(currentDate.getDate() - 1);
        onDateChange(previousDay);
        setCurrentDate(previousDay);
    };

    const handleNextDay = () => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        onDateChange(nextDay);
        setCurrentDate(nextDay);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePreviousDay} style={styles.arrowButton}>
                <MaterialCommunityIcons name="chevron-left" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                <Text style={styles.dateText}>{moment(date).format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextDay} style={styles.arrowButton}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#333" />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDatePick}
                onCancel={hideDatePicker}
                locale='pt_BR'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    arrowButton: {
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    dateButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    dateText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: "bold"
    },
});

export default DateSelector;