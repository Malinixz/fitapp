import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon, ProgressBar } from 'react-native-paper';
import { BackAppbar } from '@/components/Appbar';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles'
import { Colors } from '@/styles/Colors';

export default function Goals() {
    const [selectedButton, setSelectedButton] = useState('');
    const { user,updateUser } = useContext(UserContext);
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
        {
          title: 'Perda de Peso Agressiva',
          description: 'Foco em uma rápida redução de peso, com déficit calórico acentuado.',
        },
        {
          title: 'Perda de Peso',
          description: 'Redução de peso mais gradual e sustentável.',
        },
        {
          title: 'Manter o Peso',
          description: 'Objetivo de manter o peso atual com hábitos saudáveis.',
        },
        {
          title: 'Ganho de Peso',
          description: 'Aumento de peso moderado com superávit calórico.',
        },
        {
          title: 'Ganho de Peso Agressivo',
          description: 'Foco em ganho de peso rápido, com superávit calórico acentuado.',
        },
    ];
      

    return (
        <SafeAreaView style={styles.container}>
            <BackAppbar title="METAS" onPress={() => router.back()} />
            <ProgressBar progress={0.3} color={Colors.green} />

            <View style={styles.content}>
                <Text style={styles.guideText}>
                    Olá, {user.Name}. Para começar, nos informe seu principal objetivo.
                </Text>

                <View style={styles.buttons}>
                    {buttonOptions.map(({title, description}) => (
                        <Button
                            key={title}
                            mode='outlined'
                            style={[styles.button]}
                            onPress={() => handleButtonPress(title)}
                            icon={selectedButton === title ? () => (
                                <View style={{backgroundColor:'rgba(0, 128, 0, 0.7)', borderRadius:4}}>
                                    <Icon
                                        source="check"
                                        size={20}
                                        color='white'
                                    />
                                </View>
                            ) : undefined}
                        >
                            <View>
                                <Text style={styles.buttonText}>{title}</Text>
                                <Text style={styles.buttonDescription}>{description}</Text>
                            </View>
                        </Button>
                    ))}
                </View>
                <Text style={GlobalStyles.subText}>
                    Não se preocupe, futuramente você poderá alterar esses dados.
                </Text>
                <Button
                    mode="contained"
                    style={[GlobalStyles.button,{width:'70%', marginTop:50}]}
                    onPress={handleContinue}
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
        paddingVertical: 20,
    },
    guideText: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 0,
        fontWeight:'bold'
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 16
    },
    button: {
        width: '70%',
        marginVertical: 10,
    },
    buttonText: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        marginBottom:2
    },
    buttonDescription: {
        opacity:0.4,
        fontWeight:'bold',
        textAlign:'left',
        color:Colors.primary
    }
});