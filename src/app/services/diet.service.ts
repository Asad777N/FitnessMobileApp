import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal, DailyNutrition, NutritionGoal, MealPlan } from '../models/diet.model';

@Injectable({
  providedIn: 'root',
})
export class DietService {
  private mealsSubject = new BehaviorSubject<Meal[]>([]);
  private goalsSubject = new BehaviorSubject<NutritionGoal | null>(null);

  public meals$ = this.mealsSubject.asObservable();
  public goals$ = this.goalsSubject.asObservable();

  constructor() {}

  addMeal(meal: Omit<Meal, 'id'>): Observable<string> {
    const id = `meal_${Date.now()}`;
    const newMeal = { ...meal, id } as Meal;
    const current = this.mealsSubject.value;
    this.mealsSubject.next([...current, newMeal]);
    return from(Promise.resolve(id));
  }

  getMealsForDate(userId: string, date: Date): Observable<Meal[]> {
    return this.meals$.pipe(
      map(meals => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        return meals.filter(
          m => m.userId === userId && 
               new Date(m.date) >= startOfDay && 
               new Date(m.date) <= endOfDay
        );
      })
    );
  }

  setNutritionGoal(goal: Omit<NutritionGoal, 'createdAt' | 'updatedAt'>): Observable<string> {
    const nutritionGoal: NutritionGoal = {
      ...goal,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.goalsSubject.next(nutritionGoal);
    return from(Promise.resolve('goal_created'));
  }

  getNutritionGoal(userId: string): Observable<NutritionGoal | null> {
    return this.goals$;
  }

  createMealPlan(plan: Omit<MealPlan, 'id'>): Observable<string> {
    const planId = `mealplan_${Date.now()}`;
    return from(Promise.resolve(planId));
  }
}
