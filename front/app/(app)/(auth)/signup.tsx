import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '@/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { UserContext } from '@/contexts/UserContext';
import { BackAppbar } from '@/components/Appbar';
import { Colors } from '@/styles/Colors';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {register} = useContext(UserContext)
    const router = useRouter();

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro ao Cadastrar Usuário','Confirme a senha corretamente');
            return;
        }
        try {
            const success = await register( email, name, password );
            if(success === true){
                Alert.alert('Successo', 'Cadatro realizado com sucesso!');
                router.push('/welcome')
            }
        }   catch (err) {
            // Erros já são tratados no contexto
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <BackAppbar title={'Registro'} onPress={() => router.back()}/>
            <View style={{flex:1,justifyContent:'center', marginInline:10,marginBottom:100}}>
                <Text style={Styles.title}>Cadastro</Text>

                <TextInput
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={Styles.input}
                    autoCapitalize="words"
                />

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    style={Styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={Styles.input}
                />

                <TextInput
                    label="Confirme Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    mode="outlined"
                    secureTextEntry
                    style={Styles.input}
                />

                <Button 
                    mode="contained" 
                    onPress={handleSignUp} 
                    style={Styles.button}
                >
                    Registrar
                </Button>
            </View>
        </SafeAreaView>
    );
}
