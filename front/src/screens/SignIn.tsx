import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import Styles from '../styles/Styles';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                onPress={() => console.log('Login pressed')} 
                style={Styles.button}
            >
                Log In
            </Button>

            <Button
                mode="outlined"
                onPress={() => console.log('Google Login pressed')}
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