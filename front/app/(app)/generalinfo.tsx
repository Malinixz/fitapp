import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { Button, Icon, ProgressBar, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { BackAppbar } from '@/components/Appbar';
import { UserContext } from '@/contexts/UserContext';
import { convertToDate } from '@/utils/Dates';
import moment from 'moment';
import { useRouter } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles';
import { Colors } from '@/styles/Colors';
import { calculateNutrition } from '@/utils/NutritionCalculator';

export default function GeneralInfo() {
    const [selectedButton, setSelectedButton] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const { user, updateUser } = useContext(UserContext);
    const router = useRouter();

    const handleButtonPress = (buttonTitle : string) => {
        setSelectedButton(buttonTitle);
    };

    const handleContinue = async () => {
        const parsedBirthDate = convertToDate(birthDate);

        if (!selectedButton || !birthDate || !weight || !height) {
            Alert.alert("Campos Obrigatórios", "Por favor, preencha todos os campos.");
            return;
        }

        if (!moment(parsedBirthDate).isValid()) { // Validação da data
            Alert.alert("Data Inválida", "Por favor, insira uma data de nascimento válida.");
            return;
        }

        const updatedUser = {
            ...user,
            Gender: selectedButton[0],
            BirthDate: parsedBirthDate,
            Weight: parseFloat(weight),
            Height: parseFloat(height)
        }
        const goals = calculateNutrition(updatedUser)
        updateUser('Gender', selectedButton[0]);
        updateUser('BirthDate', parsedBirthDate);
        updateUser('Weight', parseFloat(weight));
        updateUser('Height', parseFloat(height));
        updateUser('CaloriesGoal', goals.calGoal);
        updateUser('CarbGoal', goals.macrosGoal.carb);
        updateUser('FatGoal', goals.macrosGoal.fat);
        updateUser('ProtGoal', goals.macrosGoal.prot);
        router.push('/results');
    };

    const buttonOptions = ['Masculino', 'Feminino'];

    return (
        <SafeAreaView style={styles.container}>
            <BackAppbar title="Informações Gerais" onPress={() => router.back()} />
            <ProgressBar progress={0.8} color={Colors.green}/>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={50}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.guideText}>
                        As seguintes informações serão cruciais para o cálculo da sua dieta.
                    </Text>
                    <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                        {buttonOptions.map((title) => (
                            <Button
                                key={title}
                                mode="outlined"
                                style={styles.button}
                                onPress={() => handleButtonPress(title)}
                                icon={
                                    selectedButton === title
                                        ? () => <View style={{backgroundColor:'rgba(0, 128, 0, 0.7)', borderRadius:4}}>
                                                    <Icon
                                                        source="check"
                                                        size={20}
                                                        color='white'
                                                    />
                                                </View>
                                        : undefined
                                }
                            >
                                {title}
                            </Button>
                        ))}
                    </View>

                    <TextInput
                        label="Data de Nascimento"
                        value={birthDate}
                        onChangeText={setBirthDate}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric"
                        render={(props) => (
                            <TextInputMask
                                {...props}
                                type={'datetime'}
                                options={{
                                    format: 'DD/MM/YYYY',
                                }}
                            />
                        )}
                    />
                    <TextInput
                        label="Peso (kg)"
                        value={weight}
                        onChangeText={(text) => {
                            setWeight(text.slice(0, 3)); // Limita a 3 dígitos
                        }}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        label="Altura (cm)"
                        value={height}
                        onChangeText={(text) => {
                            setHeight(text.slice(0, 3)); // Limita a 3 dígitos
                        }}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric"
                    />

                    <Text style={[GlobalStyles.subText, {marginTop:170}]}>
                        Não se preocupe, futuramente você poderá alterar esses dados.
                    </Text>
                    <Button
                        mode="contained"
                        style={[GlobalStyles.button,{width:'70%', marginTop:50}]}
                        onPress={handleContinue}
                    >
                        Continuar
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 20,
    },
    guideText: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        marginHorizontal:20
    },
    button: {
        width: '40%',
        marginVertical: 10,
        marginHorizontal: 5,
    },
    input: {
        width: '90%',
        marginBottom: 20,
        height: 50,
        backgroundColor: '#fff',
    },
    continueButton: {
        width: '70%',
        marginTop: 20,
    },
});
