export interface Meal {
  id: string;
  userId: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  date: Date;
  nutrition: MacroNutrients;
  items: FoodItem[];
  notes?: string;
  photoUrl?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface DailyNutrition {
  date: Date;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  goal: NutritionGoal;
}

export interface NutritionGoal {
  userId: string;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MealPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  meals: MealPlanDay[];
  isActive: boolean;
  createdAt: Date;
}

export interface MealPlanDay {
  day: number;
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
  snacks?: Meal[];
}
