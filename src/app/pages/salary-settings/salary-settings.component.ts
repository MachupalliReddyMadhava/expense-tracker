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

  constructor(
    private fb: FormBuilder,
    private salaryService: SalaryService
  ) {

    this.salaryForm = this.fb.group({
      salary: [
        this.salaryService.getSalary(),
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

    this.salaryService.saveSalary(
      this.salaryForm.value.salary
    );

    this.successMessage =
      'Salary saved successfully';

    setTimeout(() => {

      this.successMessage = '';

    }, 3000);

  }

}