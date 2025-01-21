import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
// import handleGoogleSignIn from '../services/SignInGoogle';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                Email: email,
                Password: password
            }, { headers: { 'Content-Type': 'application/json' } });
            
            if (response.status === 200) {
                const { token, Name, Email } = response.data;

                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userName', Name);
                await AsyncStorage.setItem('userEmail', Email);

                Alert.alert('Sucess', 'Login realizado com sucesso!');

                navigation.navigate('Home');    
            }
        } catch (error) {
            if (error.response && error.response.data) {
                Alert.alert('Error', error.response.data.msg);
            } else {
                Alert.alert('Error', 'Unable to connect to the server');
            }
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={Styles.title}>Sign In</Text>

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
            >
                Log In
            </Button>

            <Button
                mode="outlined"
                // onPress={handleGoogleSignIn}
                style={Styles.buttonGoogle}
                icon="google"
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