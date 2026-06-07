export interface Expense {
  id: number;
  title: string;
  category: string;
  customCategory?: string;
  amount: number;
  date: string;
  paymentMethod: string;
  notes?: string;
}