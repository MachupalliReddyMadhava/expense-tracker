import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BudgetSettingsComponent } from './pages/budget-settings/budget-settings.component';
import { SalarySettingsComponent } from './pages/salary-settings/salary-settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
  path: 'budget-settings',
  component: BudgetSettingsComponent
    },
  {
    path: 'salary-settings',
    component: SalarySettingsComponent
    }
];