import { Colors } from '@/styles/Colors';
import { Food } from '@/types/food.types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

interface FoodItemProps {
    food: Food;
}

const FoodItem = ({ food } : FoodItemProps) => {
    return (
        <View style={styles.foodItem}>
            <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{food.Name}</Text>
                <Text style={styles.foodServing}>{food.Serving_Total}</Text>
            </View>
            <Text style={styles.foodCalories}>{food.Calories} kcal</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    foodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    foodDetails: {
        flex: 1,
        marginRight: 8,
    },
    foodName: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 4, // Espaçamento entre nome e serving
        flexWrap: 'wrap',
    },
    foodServing: {
        fontSize: 14,
        color: '#666666',
        flexWrap: 'wrap',
    },
    foodCalories: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});

export default FoodItem;