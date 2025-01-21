import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Appbar from '../components/Appbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [userName, setUserName] = useState('');

    // Busca o nome do usuário ao carregar o componente
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                if (name) {
                    setUserName(name);
                }
            } catch (error) {
                console.error('Erro ao carregar o nome do usuário:', error);
            }
        };

        fetchUserName();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Appbar Fixo no Topo */}
            <Appbar title="HOME" onBackPress={() => navigation.goBack()} />

            {/* Conteúdo Principal */}
            <View style={styles.content}>
                <Text style={styles.welcomeText}>
                    Bem-vindo à HOME, {userName || 'Usuário'}
                </Text>
            </View>
        </SafeAreaView>
    );
}

// COLOCAR EM PASTA SEPARADA
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -56, // Ajusta a altura do Appbar
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    }
});
