// screens/Results.tsx
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { BackAppbar } from '@/components/Appbar';
import { UserContext } from '@/contexts/UserContext';
import { calculateNutrition } from '@/utils/NutritionCalculator';
import { useRouter } from 'expo-router';
import MacrosPieChart from '@/components/MacrosPieChart'; // Importe o componente

export default function ResultScreen() {
    const { user, updateUser, completeRegister } = useContext(UserContext);
    const router = useRouter();
    
    useEffect(() => {
        calculateNutrition(user, updateUser);
    }, []);

    const handleCompleteRegister = async () => {
        try {
            const result = await completeRegister();
            if (result) {
                Alert.alert('Success', 'Cadastro finalizado com sucesso!');
                router.push('/home'); // Roteamento na tela
            }
        } catch (error) {
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackAppbar title="Resultado" onPress={() => router.back()} />
            <ProgressBar progress={1} />

            <View style={styles.content}>
                <View style={styles.calorieGoalContainer}>
                    <Text style={styles.calorieGoalText}>
                        Sua meta calórica diária foi calculada :
                    </Text>
                    <Text style={styles.calorieGoalNumber}>
                        {user.CaloriesGoal} Kcal
                    </Text>
                </View>

                <MacrosPieChart
                    protGoal={user.ProtGoal}
                    carbGoal={user.CarbGoal}
                    fatGoal={user.FatGoal}
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
                    onPress={handleCompleteRegister}
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
        paddingTop: 40,
    },
    calorieGoalContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        alignItems: 'center',
    },
    calorieGoalText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
    },
    calorieGoalNumber: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        color: '#6219EE',
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