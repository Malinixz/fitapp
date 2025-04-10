import { User } from "@/types/user.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function completeProfile(user : User) {
    const token = await AsyncStorage.getItem('userToken');
    try {
        const response = await axios.put(
            `${process.env.EXPO_PUBLIC_API_URL}/complete-profile`,
            user,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.msg || 'Unable to connect to the server');
    }
}