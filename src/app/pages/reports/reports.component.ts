import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component';
import { MonthlyTrendChartComponent } from '../../components/monthly-trend-chart/monthly-trend-chart.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ExpenseChartComponent ,MonthlyTrendChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  chartData: { [key: string]: number } = {};

  ngOnInit(): void {

  this.chartData =
    this.expenseService.getCategoryWiseExpenses();
    this.monthlyTrendData =
  this.expenseService
    .getMonthlyExpenses();

}
monthlyTrendData: {
  [key: string]: number
} = {};
  constructor(
    public expenseService: ExpenseService
  ) {}

  get categoryWiseExpenses() {

    return Object.entries(
      this.expenseService.getCategoryWiseExpenses()
    );

  }
  get highestMonthDetails() {

  return this.expenseService
    .getHighestExpenseMonthDetails();

}
get averageMonthlyExpense(): number {

  return this.expenseService
    .getAverageMonthlyExpense();

}

}