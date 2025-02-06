import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import Appbar from '../components/Appbar';

export default function SignUp({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Appbar Fixo no Topo */}
            <Appbar title="REGISTRE-SE" onBackPress={() => navigation.goBack()} />
            <ProgressBar progress={0.15}/>
            {/* Conteúdo Principal */}
            <View style={styles.content}>
                <Text style={styles.welcomeText}>
                    Bem-vindo! Vamos personalizar o aplicativo de acordo com seus objetivos.
                </Text>
                <Button
                    mode="contained"
                    style={{width:'70%'}}
                    onPress={() => navigation.navigate('Goals')}
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
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    }
});
