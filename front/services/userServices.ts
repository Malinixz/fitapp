import { User } from '@/types/user.types';
import axios from 'axios';

const PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL as string;

interface Response {
    sucesso: number;
    token: string;
    msg: string;
    data: User
}

export const userService = {
    async login(email : string, password : string): Promise<Response> {
        const response = await axios.post(`${PUBLIC_API_URL}/login`, {
            Email: email,
            Password: password,
        }, { headers: { 'Content-Type': 'application/json' } });
        return response.data
    },
    async register(email : string, name : string, password : string): Promise<Response> {
        const response = await axios.post(`${PUBLIC_API_URL}/registrar`, {
            Name: name,
            Password: password,
            Email: email
        }, { headers: { 'Content-Type': 'application/json' } });
        return response.data
    },
    async completeRegister(user : User, token : string) {
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
    }
}