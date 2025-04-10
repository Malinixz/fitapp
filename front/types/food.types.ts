export interface Food {
    ID: number;
    Name: string;
    ID_Meal: number;
    ID_Food_API: string;
    Serving: string;
    Serving_Quantity: number;
    Serving_Total: string;
    Calories: number;
    Prot: number;
    Carb: number;
    Fat: number;
}

export interface FoodCreate {
    Name: string | string[];
    ID_Food_API: string | string[];
    Serving: string;
    Serving_Quantity: number;
    Serving_Total: string;
    Calories: number;
    Prot: number;
    Carb: number;
    Fat: number;
}