export interface BudgetAlert {
  category: string;
  message: string;
  type: 'warning' | 'danger';
}