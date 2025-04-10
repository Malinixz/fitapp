import React, { createContext, useState } from 'react';
import { Day } from '@/types/day.types';
import { FoodCreate } from '@/types/food.types';
import { dayService } from '@/services/dayServices';

interface DayContextProps {
  dayData: Day;
  loadDayDataAPI: (date: string | Date) => Promise<void>;
  removeFood: (ID: number) => Promise<boolean>;
  updateFood: (ID: number, newQuantity: number) => Promise<boolean>;
  addFood: (foodData: FoodCreate, meal_ID: string) => Promise<boolean>;
  updateDay: (key : string, value : any) => void;
}

export const DayContext = createContext<DayContextProps>({} as DayContextProps);

function DayProvider({ children }: { children: React.ReactNode }) {
  const [dayData, setDayData] = useState<Day>({
    ID: 0,
    Date: '',
    CaloriesTotal: 0,
    CaloriesGoal: 0,
    CarbTotal: 0,
    CarbGoal: 0,
    ProtTotal: 0,
    ProtGoal: 0,
    FatTotal: 0,
    FatGoal: 0,
    Steps: 0,
    StepsGoal: 0,
    Meals: [],
  });

  const updateDay = (key: string, value: any) => {
    setDayData((prevDaydata) => ({ ...prevDaydata, [key]: value }));
  };
  
  const loadDayDataAPI = async (date: string | Date) => {
    try {
      const data = await dayService.getDayData(date);
      setDayData(data);
    } catch (err) {
      console.error('Erro ao carregar dados do dia:', err);
      throw err;
    }
  };

  const removeFood = async (ID: number): Promise<boolean> => {
    try {
      const updatedDayData = await dayService.removeFood(ID);
      setDayData(updatedDayData);
      return true;
    } catch (error) {
      console.error('Erro ao remover alimento:', error);
      return false;
    }
  };

  const updateFood = async (ID: number, newQuantity: number): Promise<boolean> => {
    try {
      const updatedDayData = await dayService.updateFood(ID, newQuantity);
      setDayData(updatedDayData);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar alimento:', error);
      return false;
    }
  };

  const addFood = async (foodData: FoodCreate, meal_ID: string): Promise<boolean> => {
    try {
      const updatedDayData = await dayService.addFood(foodData, meal_ID);
      setDayData(updatedDayData);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar alimento:', error);
      return false;
    }
  };

  return (
    <DayContext.Provider value={{ dayData, loadDayDataAPI, removeFood, updateFood, addFood, updateDay }}>
      {children}
    </DayContext.Provider>
  );
}

export default DayProvider;