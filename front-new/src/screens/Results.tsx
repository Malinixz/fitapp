// screens/Results.tsx
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Button, ProgressBar, useTheme } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import Appbar from '../components/Appbar';
import { UserContext } from '@/contexts/UserContext';
import { calculateNutrition } from '../utils/NutritionCalculator';

export default function ResultScreen({ navigation }) {
    const { user, updateUser } = useContext(UserContext);
    const { colors } = useTheme();
    
    useEffect(() => {
        calculateNutrition( user, updateUser );
    }, []);

    const macronutrientsData = [
        {
            name: 'g Proteína',
            population: user.protGoal,
            color: '#4a148c',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'g Carboidrato',
            population: user.carbGoal,
            color: '#ab47bc',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'g Gordura',
            population: user.fatGoal,
            color: '#ce93d8',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
    ];

    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.container}>
            <Appbar title="Resultado" onBackPress={() => navigation.goBack()} />
            <ProgressBar progress={1} />

            <View style={styles.content}>
                <View style={styles.calorieGoalContainer}>
                    <Text style={styles.calorieGoalText}>
                        Sua meta calórica diária foi calculada :
                    </Text>
                    <Text style={styles.calorieGoalNumber}>
                        {user.calGoal} Kcal
                    </Text>
                </View>

                <PieChart
                    data={macronutrientsData}
                    width={screenWidth - 30}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="0"
                    absolute
                />

                <Button
                    mode="contained-tonal"
                    style={styles.editButton}
                    onPress={() => Alert.alert("Funcionalidade não implementada")}
                >
                    Editar Metas
                </Button>
                <Button
                    mode="contained"
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('Continue')}
                >
                    Continuar
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 40, // Espaço superior aumentado
    },
    calorieGoalContainer: {
        marginBottom: 20,
        padding: 15, // Aumentado o padding
        backgroundColor: '#f0f0f0',
        borderRadius: 12, // Bordas mais arredondadas
        alignItems: 'center',
    },
    calorieGoalText: {
        fontSize: 20, // Texto maior
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold', // Texto em negrito
    },
    calorieGoalNumber: {
        fontSize: 30, // Texto maior
        textAlign: 'center',
        fontWeight: 'bold', // Texto em negrito
        marginTop: 10,
        color: '#6219EE'
    },
    editButton: {
        width: '70%',
        marginVertical: 10,
    },
    continueButton: {
        width: '70%',
        marginTop: 10,
    },
});
