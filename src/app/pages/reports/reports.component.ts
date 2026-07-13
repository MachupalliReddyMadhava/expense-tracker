import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component';
import { MonthlyTrendChartComponent } from '../../components/monthly-trend-chart/monthly-trend-chart.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
formatDate(date: string): string {

  return new Date(date)
    .toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

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
exportToExcel(): void {

  const expenses =
    this.expenseService.getAllExpenses();

  const data = expenses.map(expense => ({

    Title: expense.title,

    Category:
      expense.category === 'Others'
        ? expense.customCategory
        : expense.category,

    Amount: expense.amount,

    Date: this.formatDate(expense.date),

    PaymentMethod:
      expense.paymentMethod

  }));

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  worksheet['!cols'] = [

    { wch: 25 }, // Title

    { wch: 20 }, // Category

    { wch: 15 }, // Amount

    { wch: 20 }, // Date

    { wch: 20 }  // Payment Method

  ];

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Expenses'
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: 'xlsx',
        type: 'array'
      }
    );

  const blob = new Blob(
    [excelBuffer],
    {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  );

  const today =
    new Date()
      .toISOString()
      .split('T')[0];

  saveAs(
    blob,
    `ExpenseReport-${today}.xlsx`
  );

}
}