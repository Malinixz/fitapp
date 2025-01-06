import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button, Icon, ProgressBar, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import Appbar from '../components/Appbar';

export default function SignUp({ navigation }) {
    // Estado para controlar o botão selecionado
    const [selectedButton, setSelectedButton] = useState(null);
    const [birth, setBirth] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    // Função para lidar com a seleção do botão
    const handleButtonPress = (buttonTitle) => {
        setSelectedButton(buttonTitle);
    };

    // Array de botões para renderização dinâmica
    const buttonOptions = [
        'Masculino',
        'Feminino'
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Appbar title="Informações Gerais" onBackPress={() => navigation.goBack()} />
            <ProgressBar progress={0.8} />

            <View style={styles.content}>
                <Text style={styles.guideText}>
                    As Seguintes informações serão cruciais para o cálculo da sua dieta.
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 25}}>
                    {buttonOptions.map((title) => (
                        <Button
                            key={title}
                            mode="outlined"
                            style={styles.button}
                            onPress={() => handleButtonPress(title)}
                            icon={
                                selectedButton === title
                                    ? () => <Icon source="check" size={20} />
                                    : undefined
                            }
                        >
                            {title}
                        </Button>
                    ))}
                </View>
                
                <TextInput
                    label="Data de Nascimento"
                    value={birth}
                    onChangeText={setBirth}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="numeric"
                    render={props =>
                        <TextInputMask
                            {...props}
                            type={'datetime'}
                            options={{
                              format: 'DD/MM/YYYY'
                            }}    
                        />
                    }
                />
                <TextInput
                    label="Peso (kg)"
                    value={weight}
                    onChangeText={setWeight}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    label="Altura (cm)"
                    value={height}
                    onChangeText={setHeight}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="numeric"
                />

                <Button
                    mode="contained"
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('Results')}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    guideText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 20,
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
