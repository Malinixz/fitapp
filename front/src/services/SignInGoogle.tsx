import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CLIENT_ID_GOOGLE, API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

GoogleSignin.configure({
    webClientId: CLIENT_ID_GOOGLE,
});

export default async function handleGoogleSignIn() {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const idToken = userInfo.idToken;

        const response = await axios.post(`${API_URL}/login-google`, { idToken }, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            const { Name, token, Email } = response.data;

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userName', Name);
            await AsyncStorage.setItem('userEmail', Email);

            Alert.alert('Login bem-sucedido!', `Bem-vindo, ${Name}`);
        } else {
            Alert.alert('Erro', response.data.msg || 'Falha ao fazer login.');
        }
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Alert.alert('Cancelado', 'Login cancelado pelo usuário.');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            Alert.alert('Em progresso', 'Login já em andamento.');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('Erro', 'Google Play Services não está disponível.');
        } else {
            Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
            console.error(error);
        }
    }
}
