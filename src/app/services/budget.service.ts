import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgets: Budget[] = [];

  constructor() {

    const savedBudgets =
      localStorage.getItem('budgets');

    if (savedBudgets) {

      this.budgets =
        JSON.parse(savedBudgets);

    }

  }

  getBudgets(): Budget[] {
    return this.budgets;
  }

  saveBudgets(budgets: Budget[]): void {

    this.budgets = budgets;

    localStorage.setItem(
      'budgets',
      JSON.stringify(this.budgets)
    );

  }

}