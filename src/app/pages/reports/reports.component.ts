import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ExpenseChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  chartData: { [key: string]: number } = {};

  ngOnInit(): void {

  this.chartData =
    this.expenseService.getCategoryWiseExpenses();

}
  constructor(
    public expenseService: ExpenseService
  ) {}

  get categoryWiseExpenses() {

    return Object.entries(
      this.expenseService.getCategoryWiseExpenses()
    );

  }

}