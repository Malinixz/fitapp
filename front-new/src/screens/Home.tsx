import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Appbar from '../components/Appbar';
import { useUser } from '@clerk/clerk-expo';

export default function Home({ navigation }) {
    const { user } = useUser(); // Obtém as informações do usuário autenticado diretamente do Clerk.

    return (
        <SafeAreaView style={styles.container}>
            {/* Appbar Fixo no Topo */}
            <Appbar title="HOME" onBackPress={() => navigation.goBack()} />

            {/* Conteúdo Principal */}
            <View style={styles.content}>
                <Text style={styles.welcomeText}>
                    {/* Exibe o nome do usuário, se disponível */}
                    Bem-vindo à HOME, {user?.firstName }
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
