import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { BackAppbar } from '@/components/Appbar';
import { useRouter } from 'expo-router';
import Styles from '@/styles/GlobalStyles';
import { Colors } from '@/styles/Colors';

export default function SignUp() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Appbar Fixo no Topo */}
            <BackAppbar title="REGISTRE-SE" onPress={() => router.back()} />
            <ProgressBar progress={0.15} color={Colors.green}/>
            {/* Conteúdo Principal */}
            <View style={styles.content}>
                <Text style={styles.welcomeText}>
                    Bem-vindo! Vamos personalizar o aplicativo de acordo com seus objetivos.
                </Text>
                <Button
                    mode="contained"
                    style={[Styles.button,{width:'70%'}]}
                    onPress={() => router.push('/goals')}
                >
                    Continuar
                </Button>
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
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
        fontWeight:'bold'
    }
});
