import { Food } from './food.types'

export interface Meal {
    ID: number;
    Name: string;
    Calories: number;
    Prot: number;
    Carb: number;
    Fat: number;
    Meal_Foods: Food[]; //Supondo que Food já esteja definido
}