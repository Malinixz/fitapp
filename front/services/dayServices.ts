import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Day } from '@/types/day.types';
import { FoodCreate } from '@/types/food.types';

const PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const dayService = {
  async getDayData(date: string | Date): Promise<Day> {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (!userToken) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await axios.get(`${PUBLIC_API_URL}/days/${date}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      
      if (response.status === 200) {
        return response.data.data;
      }
      
      throw new Error('Falha ao buscar dados do dia');
    } catch (err) {
      console.error('Erro ao buscar detalhes do dia:', err);
      throw err;
    }
  },

  async removeFood(ID: number): Promise<Day> {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await axios.delete(`${PUBLIC_API_URL}/meals/removeFood/${ID}`, { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        }
      });
      
      if (response.status === 200) {
        return response.data.data;
      }
      
      throw new Error('Falha ao remover alimento');
    } catch (error) {
      console.error('Erro ao remover alimento:', error);
      throw error;
    }
  },

  async updateFood(ID: number, newQuantity: number): Promise<Day> {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await axios.put(
        `${PUBLIC_API_URL}/meals/editFood/${ID}`,
        {
          Serving_Quantity: Number(newQuantity)
        },
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          }
        }
      );
      
      if (response.status === 200) {
        return response.data.data;
      }
      
      throw new Error('Falha ao atualizar alimento');
    } catch (error) {
      console.error('Erro ao atualizar alimento:', error);
      throw error;
    }
  },

  async addFood(foodData: FoodCreate, meal_ID: string): Promise<Day> {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await axios.post(
        `${PUBLIC_API_URL}/meals/addFood/${meal_ID}`, 
        {
          ...foodData
        }, 
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          }
        }
      );
      
      if (response.status === 200) {
        return response.data.data;
      }
      
      throw new Error('Falha ao adicionar alimento');
    } catch (error) {
      console.error('Erro ao adicionar alimento:', error);
      throw error;
    }
  },

  async sendSteps(date : string, steps : number) {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (!userToken) {
        throw new Error('Token de autenticação não encontrado.');
      }

      const response = await axios.put(
        `${PUBLIC_API_URL}/days/${date}/steps`, 
        {
          Steps : steps
        }, 
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          }
        }
      );
      
      return response;
    } catch (error) {
      console.error('Erro ao enviar passos:', error);
      throw error;
    }
  }
};