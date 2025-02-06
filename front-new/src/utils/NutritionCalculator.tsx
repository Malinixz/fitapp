// utils/nutritionCalculator.js
export const calculateBMR = (gender, weight, height, age) => {
    // Fórmula de Harris-Benedict
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  };
  
  export const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      extraActive: 1.9
    };
    
    return bmr * activityMultipliers[activityLevel];
  };
  
  export const calculateCalorieGoal = (tdee, goal) => {
    const goalMultipliers = {
      lose: -500,    // Déficit calórico para perda
      maintain: 0,   // Manutenção
      gain: 500      // Superávit calórico para ganho
    };
    
    return tdee + goalMultipliers[goal];
  };
  
  export const calculateMacros = (calorieGoal, proteinGoal, carbGoal, fatGoal) => {
    // Proteína e gordura em g/kg, carbs preenchem o resto
    const protein = proteinGoal * 4; // 4 calorias por grama
    const fat = fatGoal * 9;     // 9 calorias por grama
    const carbs = calorieGoal - (protein + fat);
    
    return {
      protein: Math.round(protein / 4), // Convertendo calorias para gramas
      carbs: Math.round(carbs / 4),
      fat: Math.round(fat / 9),
    };
  };