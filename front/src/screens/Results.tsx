import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import Appbar from '../components/Appbar';

export default function ResultScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width;

    // Dados dos macronutrientes (exemplo)
    const macronutrientsData = [
        { name: 'Carboidratos', population: 50, color: '#f3a683', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Proteínas', population: 30, color: '#778beb', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Gorduras', population: 20, color: '#e77f67', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Appbar title="Resultado" onBackPress={() => navigation.goBack()} />
            <ProgressBar progress={1} />

            <View style={styles.content}>
                <Text style={styles.guideText}>
                    Sua meta calórica diária foi calculada com sucesso!
                </Text>

                <PieChart
                    data={macronutrientsData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />

                <Button
                    mode="contained-tonal"
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditGoals')}
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    guideText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 20,
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
