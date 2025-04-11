import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { User } from "@/types/user.types";
import { userService } from "@/services/userServices"

interface UserContextType {
  user: User;
  login: (email: string, password: string) => Promise<{ success: boolean; completeProfile: boolean }>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  updateUser: (key: string, value: any) => void;
  completeRegister: () => Promise<boolean>;
  weightUpdates: { Date: string; Weight: number }[];
  addWeightUpdate: (weight: number) => Promise<any>;
}

// Criação do contexto
export const UserContext = createContext<UserContextType>({} as UserContextType);
const PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL as string

// Provider que encapsula a lógica de estado e fornece acesso global
function UserProvider({ children }:{ children : React.ReactNode }){
  const [user, setUser] = useState<User>({
    Email: '',
    Name: '',
    Gender: '',
    BirthDate: '',
    Weight: 0,
    Height: 0,
    ActvLevel: '',
    Goal: '',
    ProtGoal: 0,
    CarbGoal: 0,
    FatGoal: 0,
    CaloriesGoal: 0,
    StepsGoal: 0,
    CompleteProfile: false
  });

  const [weightUpdates, setWeightUpdates] = useState([])

  const updateUser = (key: string, value: any) => {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  const login = async (email : string, password : string) => {
    try {
      const userData = await userService.login(email, password);
      await AsyncStorage.setItem('userToken', userData.token)
      await AsyncStorage.setItem('email', userData.data.Email)
      setUser(userData.data)
      loadWeightUpdates()

      return {
        success: true,
        completeProfile : userData.data.CompleteProfile
      }
    } catch(err) {
      console.error('Erro realizar autenticação do usuário:', err);
      throw err
    }
  }
  
  const register = async (email : string, name : string, password : string) => {
    try {
      const userData = await userService.register(email, name, password)
      await AsyncStorage.setItem('userToken', userData.token)
      updateUser('Email', userData.data.Email)
      updateUser('Name', userData.data.Name)

      if(userData.sucesso === 1){
        return true
      } else {
        return false
      }
    } catch(err) {
      console.error('Erro ao realizar registro do usuário: ', err)
      throw err
    }
  }

  const completeRegister = async () => {
    try{
      const token = await AsyncStorage.getItem('userToken')
      const responseData = await userService.completeRegister(user, token)
      if(responseData.sucesso === 1){
        updateUser('CompleteProfile', responseData.CompleteProfile)
        return true
      } else {
        return false
      }
    }catch(err){
      console.error('Erro ao completar cadastro de usuário: ', err)
      throw err
    }
  }

  // Carrega todos updates de peso em memoria
  const loadWeightUpdates = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await axios.get(`${PUBLIC_API_URL}/user/weight-updates`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const apiData = response.data.data;
      setWeightUpdates(apiData);

    } catch(err) {

    }
  }

  const addWeightUpdateAPI = async (weight : number) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      const response = await axios.put(`${PUBLIC_API_URL}/user/weight`,{
        Weight: weight
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      return { status: response.status, data: response.data };
    } catch(err) {
      console.error('Erro ao atualizar peso: ', err)
    }
  }

  const addWeightUpdateLocal = (weight: number) => {
    const today = new Date().toLocaleDateString("en-CA"); // Data atual no formato YYYY-MM-DD
  
    const existingUpdateIndex = weightUpdates.findIndex((update) => update.Date === today);
    if (existingUpdateIndex !== -1) {
      // Atualiza o peso se a data de hoje já existir
      const updatedUpdates = [...weightUpdates];
      updatedUpdates[existingUpdateIndex].Weight = weight;
      setWeightUpdates(updatedUpdates);
    } else {
      // Insere um novo objeto se a data de hoje não existir
      setWeightUpdates([{ Date: today, Weight: weight }, ...weightUpdates]);
    }
  };

  const addWeightUpdate = async (weight : number) => {
    const response = await addWeightUpdateAPI(weight)

    if(response){
      if(response.status === 200) {
        await addWeightUpdateLocal(weight)
      }
      
      return response
    }
  }

  // Efeito para carregar dados iniciais do usuario
  useEffect(() => {
    loadWeightUpdates();
  }, [user.CompleteProfile]);

  return (
    <UserContext.Provider value={{ user, login, updateUser, weightUpdates, addWeightUpdate, register, completeRegister }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
