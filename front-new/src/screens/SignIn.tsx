import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Alert, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const googleOAuth = useOAuth({ strategy: 'oauth_google' });

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
                
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Error', 'Google sign-in failed. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        console.log(API_URL)
        try {
            // const response = await axios.post(`${API_URL}/login`, {
            const response = await axios.post(`http://192.168.68.113:3000/login`, {
                Email: email,
                Password: password,
            }, { headers: { 'Content-Type': 'application/json' } });
            
            if (response.status === 200) {
                const { token, Name, Email } = response.data;

                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userName', Name);
                await AsyncStorage.setItem('userEmail', Email);

                Alert.alert('Success', 'Login realizado com sucesso!');
                navigation.navigate('Welcome');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Unable to connect to the server';
            Alert.alert('Error', errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={Styles.title}>Sign In</Text>

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
                label="Password"
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
                Log In with Google
            </Button>

            <View style={Styles.signupContainer}>
                <Text>Don't have an account? </Text>
                <Button onPress={() => navigation.navigate('SignUp')}>
                    Sign Up
                </Button>
            </View>
        </SafeAreaView>
    );
}