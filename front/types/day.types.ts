import { Meal } from './meal.types'

export interface Day {
    ID: number;
    Date: string;
    CaloriesTotal: number;
    CaloriesGoal: number;
    CarbTotal: number;
    CarbGoal: number;
    ProtTotal: number;
    ProtGoal: number;
    FatTotal: number;
    FatGoal: number;
    Steps: number;
    StepsGoal: number;
    Meals: Meal[];
}