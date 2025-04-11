import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon, ProgressBar } from 'react-native-paper';
import { BackAppbar } from '@/components/Appbar';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import GlobalStyles from '@/styles/GlobalStyles'
import { Colors } from '@/styles/Colors';

export default function ActvLevel() {
    const [selectedButton, setSelectedButton] = useState('');
    const { updateUser } = useContext(UserContext);
    const router = useRouter();

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
        updateUser('ActvLevel', selectedButton);
        router.push('/generalinfo')
    }

    // Array de botões para renderização dinâmica
    const buttonOptions = [
        {
          title: 'Sedentário',
          description: 'Nenhuma atividade física no dia a dia. Trabalho que não exige movimento.',
        },
        {
          title: 'Levemente Ativo',
          description: 'Atividades leves no dia. Exercícios leves 1 a 3 vezes na semana.',
        },
        {
          title: 'Moderadamente Ativo',
          description: 'Pratica exercícios moderados de 3 a 5 vezes por semana, ou um estilo de vida muito ativo.',
        },
        {
          title: 'Muito Ativo',
          description: 'Pratica exercícios intensos quase todos os dias e/ou tem um trabalho fisicamente exigente.',
        },
        {
          title: 'Extremamente Ativo',
          description: 'Atleta ou pessoa com rotina de treinos intensos diários e alto gasto calórico. Ex: dois treinos por dia.',
        },
    ];
      

    return (
        <SafeAreaView style={styles.container}>
            <BackAppbar title="Nível de Atividade" onPress={() => router.back()} />
            <ProgressBar progress={0.5} color={Colors.green} />

            <View style={styles.content}>
                <Text style={styles.guideText}>
                    Selecione seu Nível de Atividade Física Semanal
                </Text>

                <View style={[styles.buttons, {marginTop:160}]}>
                    {buttonOptions.map(({title, description}) => (
                        <Button
                            key={title}
                            mode='outlined'
                            style={styles.button}
                            onPress={() => handleButtonPress(title)}
                            icon={selectedButton === title ? () => (
                                <View style={{backgroundColor:Colors.green, borderRadius:4}}>
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
        fontSize: 24,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: -30,
        fontWeight:'bold'
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