import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseFormComponent , FormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  selectedExpense?: Expense;
  budgetAlertMessage = '';
  searchText = '';
  selectedCategory = 'All';
  fromDate = '';
  toDate = '';

  constructor(
    private expenseService: ExpenseService
  ) {}

  get expenses(): Expense[] {
    return this.expenseService.getExpenses();
  }
get filteredExpenses(): Expense[] {

  return this.expenses.filter(expense => {

    const category =
      expense.category === 'Others'
        ? expense.customCategory || 'Others'
        : expense.category;

    const matchesSearch =
      expense.title
        .toLowerCase()
        .includes(
          this.searchText.toLowerCase()
        );

    const matchesCategory =
      this.selectedCategory === 'All'
      ||
      category === this.selectedCategory;

    const expenseDate =
      new Date(expense.date);

    const matchesFromDate =
      !this.fromDate
      ||
      expenseDate >= new Date(this.fromDate);

    const matchesToDate =
      !this.toDate
      ||
      expenseDate <= new Date(this.toDate);

    return (
      matchesSearch
      &&
      matchesCategory
      &&
      matchesFromDate
      &&
      matchesToDate
    );

  });

}
clearFilters(): void {

  this.searchText = '';

  this.selectedCategory = 'All';
  this.fromDate = '';

  this.toDate = '';

}
onExpenseAdded(expense: Expense) {

  const existingExpense =
    this.expenses.find(
      e => e.id === expense.id
    );

  if (existingExpense) {

    this.expenseService
      .updateExpense(expense);

  } else {

    this.expenseService
      .addExpense(expense);

  }

  this.selectedExpense = undefined;

}
  deleteExpense(id: number): void {

  const isConfirmed = confirm(
    'Are you sure you want to delete this expense?'
  );

  if (!isConfirmed) {
    return;
  }

  this.expenseService.deleteExpense(id);

}
private checkBudgetAlert(expense: Expense): void {

  const budgets = JSON.parse(
    localStorage.getItem('budgets') || '[]'
  );

  const budget = budgets.find(
    (b: any) =>
      b.category ===
      (expense.category === 'Others'
        ? expense.customCategory
        : expense.category)
  );

  if (!budget) {
    return;
  }

  const categoryName =
    expense.category === 'Others'
      ? expense.customCategory
      : expense.category;

  const totalSpent = this.expenses
    .filter(exp => {

      const category =
        exp.category === 'Others'
          ? exp.customCategory
          : exp.category;

      return category === categoryName;

    })
    .reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

  const percentage =
    (totalSpent / budget.monthlyLimit) * 100;

  if (percentage >= 100) {

    this.budgetAlertMessage =
      `🔴 ${categoryName} budget exceeded`;

  } else if (percentage >= 90) {

    this.budgetAlertMessage =
      `⚠ ${categoryName} budget reached 90%`;

  } else if (percentage >= 50) {

    this.budgetAlertMessage =
      `⚠ ${categoryName} budget reached 50%`;

  }

  if (this.budgetAlertMessage) {

    setTimeout(() => {
      this.budgetAlertMessage = '';
    }, 5000);

  }

}
editExpense(expense: Expense): void {

  this.selectedExpense = {
    ...expense
  };

}

}