import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Alert, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '@/styles/GlobalStyles';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from "@clerk/clerk-expo";
import { UserContext } from '@/contexts/UserContext';
import { BackAppbar } from '@/components/Appbar';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(UserContext)
    const googleOAuth = useOAuth({ strategy: 'oauth_google' });
    const router = useRouter();

    useEffect(() => {
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const oAuthFlow = await googleOAuth.startOAuthFlow();
            if (oAuthFlow.authSessionResult?.type === "success") {
                if (oAuthFlow.setActive) {
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
                }
                // Logica para persistencia
                // ???
                
                // navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Error', 'Google sign-in failed. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor preencha todos os campos');
            return;
        }
        
        try {
            const result = await login( email, password ); // userContext
            if(result.success){
                Alert.alert('Successo', 'Login realizado com sucesso!');
                if(result.completeProfile){
                    router.push('/home')
                }else{
                    router.push('/welcome')
                }
            }
        }   catch (err) {
            // Erros já são tratados no contexto
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <BackAppbar title={'Login'} onPress={() => router.back()}/>
            <View style={{flex:1,justifyContent:'center',marginInline:10, marginBottom:100}}>
                <Text style={Styles.title}>Login</Text>

                {loading && <ActivityIndicator size="large" color="#6200ee" />}

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

                <Button 
                    mode="contained" 
                    onPress={handleSignIn} 
                    style={Styles.button}
                    disabled={loading}
                >
                    Log In
                </Button>

                <Button
                    mode="outlined"
                    onPress={handleGoogleSignIn}
                    style={Styles.buttonGoogle}
                    icon="google"
                    disabled={loading}
                >
                    Log In com Google
                </Button>
            </View>
        </SafeAreaView>
    );
}