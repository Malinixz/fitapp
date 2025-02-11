import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon, ProgressBar } from 'react-native-paper';
import Appbar from '../components/Appbar';
import { UserContext } from '@/contexts/UserContext';

export default function SignUp({ navigation }) {
    const [selectedButton, setSelectedButton] = useState(null);
    const { updateUser } = useContext(UserContext);

    // Função para lidar com a seleção do botão
    const handleButtonPress = (buttonTitle) => {
        setSelectedButton(buttonTitle);
    };

    // Função para salvar o dado na chave de user
    const handleContinue = () => {
        if (!selectedButton) {
            Alert.alert("Campo Obrigatório", "Por favor, escolha uma opção.");
            return;
        }
        updateUser('actvLevel', selectedButton);
        navigation.navigate('GeneralInfo')
    }

    // Array de botões para renderização dinâmica
    const buttonOptions = [
        'Sedentário',
        'Levemente Ativo',
        'Moderadamente Ativo', 
        'Muito Ativo',
        'Extremamente Ativo'
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Appbar title="Nível de Atividade" onBackPress={() => navigation.goBack()} />
            <ProgressBar progress={0.5} />

            <View style={styles.content}>
                <Text style={styles.guideText}>
                    Selecione seu Nível de Atividade Física Semanal
                </Text>

                <View style={styles.buttons}>
                    {buttonOptions.map((title) => (
                        <Button
                            key={title}
                            mode='outlined'
                            style={styles.button}
                            onPress={() => handleButtonPress(title)}
                            icon={selectedButton === title ? () => (
                                <Icon
                                    source="check"
                                    size={20}
                                />
                            ) : undefined}
                        >
                            {title}
                        </Button>
                    ))}
                    <Button
                    mode="contained"
                    style={{width:'70%', marginTop:50}}
                    onPress={handleContinue}
                    >
                        Continuar
                    </Button>
                </View>
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
        paddingVertical: 20,
    },
    guideText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: -30
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 100,
    },
    button: {
        width: '70%',
        marginVertical: 10,
    },
});