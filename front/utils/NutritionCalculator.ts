import { Food } from "@/types/food.types";
import { Meal } from "@/types/meal.types";

export function calculateNutrition( user, updateUser ) {
    const bmr = calculateBMR(user);
    const tdee = calculateTDEE(user, bmr);
    const calorieGoal = calculateCalorieGoal(user, tdee);
    const macroResults = calculateMacros(user, calorieGoal);

    updateUser('CaloriesGoal', calorieGoal);
    updateUser('CarbGoal', macroResults.carbs);
    updateUser('FatGoal', macroResults.fat);
    updateUser('ProtGoal', macroResults.protein);
}

const calculateBMR = (user: { BirthDate: string; Gender: string; Weight: number; Height: number; }) => {
    const age = new Date().getFullYear() - new Date(user.BirthDate).getFullYear();
    // Fórmula de Harris-Benedict
    if (user.Gender === 'M') {
        return 88.362 + (13.397 * user.Weight) + (4.799 * user.Height) - (5.677 * age);
    }
    return 447.593 + (9.247 * user.Weight) + (3.098 * user.Height) - (4.330 * age);
};

const calculateTDEE = (user: { ActvLevel: string; }, bmr: number) => {
    const activityMultipliers = {
        "Sedentário": 1.2,
        "Levemente Ativo": 1.375,
        "Moderadamente Ativo": 1.55,
        "Muito Ativo": 1.725,
        "Extremamente Ativo": 1.9
    };
    return Math.round(bmr * activityMultipliers[user.ActvLevel]);
};

const calculateCalorieGoal = (user: { Goal: string; }, tdee: number) => {
    const goalMultipliers = {
        "Perda de Peso Agressiva": -500,
        "Perda de Peso": -250,
        "Manter o Peso": 0,
        "Ganho de Peso": 250,
        "Ganho de Peso Agressivo": 500
    };

    return Math.round(tdee + goalMultipliers[user.Goal]);
};

const calculateMacros = (user: { Weight: number; }, calorieGoal: number) => {
    // Proteína e gordura em g/kg
    const protein = user.Weight * 2; // 2g por quilo corporal
    const fat = user.Weight * 0.8;    // 0.8g por quilo corporal

    // Calcula a quantidade de calorias provenientes de proteina e gordura
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;

    // Calcula as calorias restantes para carboidratos
    const remainingCalories = calorieGoal - proteinCalories - fatCalories;

    // Calorias restantes são preenchidas com carboidrato
    const carbs = remainingCalories / 4;

    return {
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
    };
};

export const calculateCarbProtPercentage = (nutrientValue: number, totalCalories: number) => {
    if (totalCalories === 0) return 0;
    return ((nutrientValue * 4) / totalCalories) * 100;
  };

export const calculateFatPercentage = (nutrientValue: number, totalCalories: number) => {
  if (totalCalories === 0) return 0;
  return ((nutrientValue * 9) / totalCalories) * 100;
};

// Função para Calcular o Total de macros de uma refeição
export const getMealMacros = (Foods: Food[]) => {
    return Foods.reduce(
        (sum, food) => ({
          Calories: sum.Calories + food.Calories,
          Prot: sum.Prot + food.Prot,
          Carb: sum.Carb + food.Carb,
          Fat: sum.Fat + food.Fat,
        }),
        { Calories: 0, Prot: 0, Carb: 0, Fat: 0 }
    );
};

// Função para Calcular o Total de macros de uma refeição
export const getDayMacros = (Meals: Meal[]) => {
    return Meals.reduce(
        (sum, meal) => ({
          CaloriesTotal: sum.CaloriesTotal + meal.Calories,
          ProtTotal: sum.ProtTotal + meal.Prot,
          CarbTotal: sum.CarbTotal + meal.Carb,
          FatTotal: sum.FatTotal + meal.Fat,
        }),
        { CaloriesTotal: 0, ProtTotal: 0, CarbTotal: 0, FatTotal: 0 }
    );
};