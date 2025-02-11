export function calculateNutrition( user, updateUser ) {
    const bmr = calculateBMR(user);
    const tdee = calculateTDEE(user, bmr);
    const calorieGoal = calculateCalorieGoal(user, tdee);
    const macroResults = calculateMacros(user, calorieGoal);

    updateUser('calGoal', calorieGoal);
    updateUser('carbGoal', macroResults.carbs);
    updateUser('fatGoal', macroResults.fat);
    updateUser('protGoal', macroResults.protein);
}

const calculateBMR = (user: { birthDate: string; gender: string; weight: number; height: number; }) => {
    const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
    // Fórmula de Harris-Benedict
    if (user.gender === 'Masculino') {
        return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * age);
    }
    return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * age);
};

const calculateTDEE = (user: { actvLevel: string; }, bmr: number) => {
    const activityMultipliers = {
        "Sedentário": 1.2,
        "Levemente Ativo": 1.375,
        "Moderadamente Ativo": 1.55,
        "Muito Ativo": 1.725,
        "Extremamente Ativo": 1.9
    };
    return Math.round(bmr * activityMultipliers[user.actvLevel]);
};

const calculateCalorieGoal = (user: { goal: string; }, tdee: number) => {
    const goalMultipliers = {
        "Perda de Peso Agressiva": -500,
        "Perda de Peso": -250,
        "Manter o Peso": 0,
        "Ganho de Peso": 250,
        "Ganho de Peso Agressivo": 500
    };

    return Math.round(tdee + goalMultipliers[user.goal]);
};

const calculateMacros = (user: { weight: number; }, calorieGoal: number) => {
    // Proteína e gordura em g/kg
    const protein = user.weight * 2; // 2g por quilo corporal
    const fat = user.weight * 0.8;    // 0.8g por quilo corporal

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