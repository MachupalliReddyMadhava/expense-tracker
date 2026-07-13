import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { SalaryService } from '../../services/salary.service';

@Component({
  selector: 'app-salary-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './salary-settings.component.html',
  styleUrl: './salary-settings.component.css'
})
export class SalarySettingsComponent {

  salaryForm: FormGroup;

  successMessage = '';
  savedSalary: number = 0;

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService
  ) {

    this.savedSalary = this.salaryService.getSalary();

    this.salaryForm = this.fb.group({
      salary: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ]
    });
  }

  saveSalary(): void {

    if (this.salaryForm.invalid) {
      this.salaryForm.markAllAsTouched();
      return;
    }

    const salary = this.salaryForm.value.salary;

    // Replace old salary
    this.salaryService.saveSalary(salary);

    // Display latest salary
    this.savedSalary = salary;

    // Clear input
    this.salaryForm.reset();

    this.successMessage = 'Salary saved successfully';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

}