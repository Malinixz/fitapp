import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon, ProgressBar } from 'react-native-paper';
import { BackAppbar } from '@/components/Appbar';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';

export default function SignUp() {
    const [selectedButton, setSelectedButton] = useState(null);
    const { updateUser } = useContext(UserContext);
    const router = useRouter();
    
    const handleButtonPress = (buttonTitle) => {
        setSelectedButton(buttonTitle);
    };

    const handleContinue = () => {
        if (!selectedButton) {
            Alert.alert("Campo Obrigatório", "Por favor, escolha uma opção.");
            return;
        }
        updateUser('Goal', selectedButton);
        router.push('/actvlevel');
    }
    
    const buttonOptions = [
        'Perda de Peso Agressiva',
        'Perda de Peso',
        'Manter o Peso', 
        'Ganho de Peso',
        'Ganho de Peso Agressivo'
    ];

    return (
        <SafeAreaView style={styles.container}>
            <BackAppbar title="METAS" onPress={() => router.back()} />
            <ProgressBar progress={0.3} />

            <View style={styles.content}>
                <Text style={styles.guideText}>
                    Selecione sua meta atual.
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