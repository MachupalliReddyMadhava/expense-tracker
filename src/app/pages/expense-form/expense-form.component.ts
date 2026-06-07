import { Component, EventEmitter, Output , OnChanges, Input ,SimpleChanges } from '@angular/core';
import { Expense } from '../../models/expense';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent implements OnChanges {

  @Input()
  expense?: Expense;
ngOnChanges(
  changes: SimpleChanges
): void {

  if (
    changes['expense']
    &&
    this.expense
  ) {

    this.expenseForm.patchValue({

      title: this.expense.title,

      category: this.expense.category,

      customCategory:
        this.expense.customCategory,

      amount: this.expense.amount,

      date: this.expense.date,

      paymentMethod:
        this.expense.paymentMethod,

      notes: this.expense.notes

    });

  }

}
  todayDate: string = new Date().toISOString().split('T')[0];

  @Output()
  expenseAdded = new EventEmitter<Expense>();

  expenseForm: FormGroup;
  successMessage = '';  

  constructor(private fb: FormBuilder) {

    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],

      category: ['', Validators.required],

      customCategory: [''],

      amount: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      date: ['', Validators.required],

      paymentMethod: ['', Validators.required],

      notes: ['']
    });

    this.expenseForm.get('category')?.valueChanges.subscribe(value => {

      const customCategory =
        this.expenseForm.get('customCategory');

      if (value === 'Others') {

        customCategory?.setValidators([
          Validators.required
        ]);

      } else {

        customCategory?.clearValidators();
        customCategory?.setValue('');

      }

      customCategory?.updateValueAndValidity();

    });
  }

  saveExpense() {

    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    const expense: Expense = {

  id: this.expense?.id
      || Date.now(),

  ...this.expenseForm.value

};

    this.successMessage = 'Expense saved successfully';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);

    this.expenseAdded.emit(expense);
    this.expenseForm.reset();
  }
}