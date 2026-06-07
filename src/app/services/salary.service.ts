import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private storageKey = 'monthlySalary';

  saveSalary(salary: number): void {

    localStorage.setItem(
      this.storageKey,
      salary.toString()
    );

  }

  getSalary(): number {

    return Number(
      localStorage.getItem(this.storageKey) || 0
    );

  }

}