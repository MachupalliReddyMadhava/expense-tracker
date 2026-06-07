import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenses: Expense[] = [];

  constructor() {

    const savedExpenses =
      localStorage.getItem('expenses');

    if (savedExpenses) {

      this.expenses =
        JSON.parse(savedExpenses);

    }

  }
  getCategoryWiseExpenses(): { [key: string]: number } {

  const categoryTotals: {
    [key: string]: number
  } = {};

  this.expenses.forEach(expense => {

    const category =
      expense.category === 'Others'
        ? expense.customCategory || 'Others'
        : expense.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0)
      + expense.amount;

  });

  return categoryTotals;

}
getBudgetUtilization() {

  const budgets = JSON.parse(
    localStorage.getItem('budgets') || '[]'
  );

  return budgets.map((budget: any) => {

    const spent = this.expenses
      .filter(expense => {

        const category =
          expense.category === 'Others'
            ? expense.customCategory
            : expense.category;

        return category === budget.category;

      })
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    const percentage =
      budget.monthlyLimit > 0
        ? Math.round(
            (spent / budget.monthlyLimit) * 100
          )
        : 0;

    return {
      category: budget.category,
      spent,
      limit: budget.monthlyLimit,
      percentage
    };

  });

}

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense): void {

    this.expenses.unshift(expense);

    this.saveExpenses();

  }

  private saveExpenses(): void {

    localStorage.setItem(
      'expenses',
      JSON.stringify(this.expenses)
    );

  }

  deleteExpense(id: number): void {

  this.expenses = this.expenses.filter(
    expense => expense.id !== id
  );

  this.saveExpenses();

}
getTotalExpenses(): number {

  return this.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

}

getTransactionCount(): number {

  return this.expenses.length;

}

updateExpense(updatedExpense: Expense): void {

  const index = this.expenses.findIndex(
    expense => expense.id === updatedExpense.id
  );

  if (index !== -1) {

    this.expenses[index] = updatedExpense;

    this.saveExpenses();

  }

}
getHighestExpenseMonthDetails(): {
  month: string;
  amount: number;
} {

  const monthlyExpenses =
    this.getMonthlyExpenses();

  let highestMonth = '';

  let highestAmount = 0;

  Object.entries(monthlyExpenses)
    .forEach(([month, amount]) => {

      if (amount > highestAmount) {

        highestAmount = amount;

        highestMonth = month;

      }

    });

  return {
    month: highestMonth,
    amount: highestAmount
  };

}
getAverageMonthlyExpense(): number {

  const monthlyExpenses =
    Object.values(
      this.getMonthlyExpenses()
    );

  if (
    monthlyExpenses.length === 0
  ) {
    return 0;
  }

  const total =
    monthlyExpenses.reduce(
      (sum, amount) =>
        sum + amount,
      0
    );

  return Math.round(
    total / monthlyExpenses.length
  );

}

getHighestSpendingCategory(): string {

  if (this.expenses.length === 0) {
    return 'No Data';
  }

  const categoryTotals: {
    [key: string]: number
  } = {};

  this.expenses.forEach(expense => {

    const category =
      expense.category === 'Others'
        ? expense.customCategory || 'Others'
        : expense.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0)
      + expense.amount;

  });

  return Object.keys(categoryTotals).reduce(
    (a, b) =>
      categoryTotals[a] > categoryTotals[b]
        ? a
        : b
  );

}
getMonthlyExpenses() {

  const monthlyTotals: {
    [key: string]: number
  } = {};

  this.expenses.forEach(expense => {

    const date =
      new Date(expense.date);

    const month =
      date.toLocaleString(
        'default',
        { month: 'short' }
      );

    monthlyTotals[month] =
      (monthlyTotals[month] || 0)
      + expense.amount;

  });

  return monthlyTotals;

}
getBudgetAlerts(): string[] {

  const alerts: string[] = [];

  const budgets = JSON.parse(
    localStorage.getItem('budgets') || '[]'
  );

  budgets.forEach((budget: any) => {

    const totalSpent = this.expenses
      .filter(expense => {

        const category =
          expense.category === 'Others'
            ? expense.customCategory
            : expense.category;

        return category === budget.category;

      })
      .reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    const percentage =
      (totalSpent / budget.monthlyLimit) * 100;

    if (percentage >= 100) {

      alerts.push(
        `🔴 ${budget.category} budget exceeded`
      );

    } else if (percentage >= 90) {

      alerts.push(
        `⚠ ${budget.category} budget reached 90%`
      );

    } else if (percentage >= 50) {

      alerts.push(
        `⚠ ${budget.category} budget reached 50%`
      );

    }

  });

  return alerts;

}

}