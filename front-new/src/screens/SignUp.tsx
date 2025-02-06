import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '../styles/Styles';
import axios from 'axios';
import { API_URL } from '@env';

export default function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            console.log('Confirme a senha corretamente');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/registrar`, {
                Name: name,
                Password: password,
                Email: email
            }, { headers: { 'Content-Type': 'application/json' } });
                
            if (response.status === 200) {
                Alert.alert(response.data.msg);
                navigation.navigate('Welcome');
            }

        } catch (error) {
            if (error.response && error.response.data) {
                Alert.alert('Erro', error.response.data.msg);
            } else {
                Alert.alert('Erro', 'Unable to connect to the server');
            }
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <Text style={Styles.title}>Sign Up</Text>

            <TextInput
                label="Name"
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
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={Styles.input}
            />

            <TextInput
                label="Confirm Password"
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
                Sign Up
            </Button>

            <View style={Styles.signupContainer}>
                <Text>Already have an account? </Text>
                <Button onPress={() => navigation.navigate('SignIn')}>
                    Sign In
                </Button>
            </View>
        </SafeAreaView>
    );
}
