import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { SalaryService } from '../../services/salary.service';
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ExpenseChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  chartData: { [key: string]: number } = {};  

  constructor(
    public expenseService: ExpenseService,
    public salaryService: SalaryService
  ) {}

ngOnInit(): void {

  this.chartData =
    this.expenseService.getCategoryWiseExpenses();

}

  get budgetAlerts(): string[] {

  return this.expenseService.getBudgetAlerts();

}
get monthlySalary(): number {

  return this.salaryService.getSalary();

}

get remainingBalance(): number {

  return (
    this.salaryService.getSalary()
    -
    this.expenseService.getTotalExpenses()
  );

}
get budgetUtilization() {

  return this.expenseService
    .getBudgetUtilization();

}

get savingsPercentage(): number {

  const salary =
    this.salaryService.getSalary();

  if (!salary) {
    return 0;
  }

  return Math.round(
    (
      this.remainingBalance
      /
      salary
    ) * 100
  );

}

}