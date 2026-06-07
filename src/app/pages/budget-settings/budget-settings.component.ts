import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Budget } from '../../models/budget';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budget-settings.component.html',
  styleUrl: './budget-settings.component.css'
})
export class BudgetSettingsComponent {

  budgetForm: FormGroup;

  successMessage = '';

  budgets: Budget[] = [];

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService
  ) {

    this.budgetForm = this.fb.group({
      food: ['', [Validators.required, Validators.min(1)]],
      travel: ['', [Validators.required, Validators.min(1)]],
      shopping: ['', [Validators.required, Validators.min(1)]],
      bills: ['', [Validators.required, Validators.min(1)]],
      entertainment: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadBudgets();
  }

  loadBudgets(): void {

    this.budgets =
      this.budgetService.getBudgets();

    const food =
      this.budgets.find(
        b => b.category === 'Food'
      );

    const travel =
      this.budgets.find(
        b => b.category === 'Travel'
      );

    const shopping =
      this.budgets.find(
        b => b.category === 'Shopping'
      );

    const bills =
      this.budgets.find(
        b => b.category === 'Bills'
      );

    const entertainment =
      this.budgets.find(
        b => b.category === 'Entertainment'
      );

    this.budgetForm.patchValue({
      food: food?.monthlyLimit || '',
      travel: travel?.monthlyLimit || '',
      shopping: shopping?.monthlyLimit || '',
      bills: bills?.monthlyLimit || '',
      entertainment: entertainment?.monthlyLimit || ''
    });

  }

  saveBudgets(): void {

    if (this.budgetForm.invalid) {

      this.budgetForm.markAllAsTouched();

      return;
    }

    const budgets: Budget[] = [

      {
        category: 'Food',
        monthlyLimit:
          Number(this.budgetForm.value.food)
      },

      {
        category: 'Travel',
        monthlyLimit:
          Number(this.budgetForm.value.travel)
      },

      {
        category: 'Shopping',
        monthlyLimit:
          Number(this.budgetForm.value.shopping)
      },

      {
        category: 'Bills',
        monthlyLimit:
          Number(this.budgetForm.value.bills)
      },

      {
        category: 'Entertainment',
        monthlyLimit:
          Number(this.budgetForm.value.entertainment)
      }

    ];

    this.budgetService.saveBudgets(budgets);

    this.budgets = budgets;

    this.successMessage =
      'Budgets saved successfully';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);

  }

}