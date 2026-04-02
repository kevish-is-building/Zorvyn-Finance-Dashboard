export const STORAGE_KEYS = {
  role: 'finance-dashboard-role',
  theme: 'finance-dashboard-theme',
  transactions: 'finance-dashboard-transactions',
}

export const initialTransactions = [
  { id: 1, date: '2026-03-01', description: 'Salary payout', amount: 85000, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-03-03', description: 'Rent payment', amount: 18000, category: 'Housing', type: 'expense' },
  { id: 3, date: '2026-03-05', description: 'Grocery shopping', amount: 3400, category: 'Food', type: 'expense' },
  { id: 4, date: '2026-03-07', description: 'Freelance project', amount: 22000, category: 'Freelance', type: 'income' },
  { id: 5, date: '2026-03-09', description: 'Netflix subscription', amount: 649, category: 'Entertainment', type: 'expense' },
  { id: 6, date: '2026-03-10', description: 'Petrol refill', amount: 2400, category: 'Transport', type: 'expense' },
  { id: 7, date: '2026-03-12', description: 'Dining out', amount: 1950, category: 'Food', type: 'expense' },
  { id: 8, date: '2026-03-14', description: 'Stock dividend', amount: 4800, category: 'Investments', type: 'income' },
  { id: 9, date: '2026-03-16', description: 'Electricity bill', amount: 2100, category: 'Utilities', type: 'expense' },
  { id: 10, date: '2026-03-18', description: 'Movie tickets', amount: 900, category: 'Entertainment', type: 'expense' },
  { id: 11, date: '2026-03-20', description: 'Part-time mentoring', amount: 6500, category: 'Side Hustle', type: 'income' },
  { id: 12, date: '2026-03-21', description: 'Internet bill', amount: 999, category: 'Utilities', type: 'expense' },
  { id: 13, date: '2026-03-23', description: 'Pharmacy order', amount: 1250, category: 'Health', type: 'expense' },
  { id: 14, date: '2026-03-24', description: 'Coffee meetings', amount: 780, category: 'Food', type: 'expense' },
  { id: 15, date: '2026-03-25', description: 'App template sale', amount: 3200, category: 'Other Income', type: 'income' },
  { id: 16, date: '2026-03-27', description: 'Gym membership', amount: 1600, category: 'Health', type: 'expense' },
  { id: 17, date: '2026-03-29', description: 'Phone bill', amount: 799, category: 'Utilities', type: 'expense' },
  { id: 18, date: '2026-03-30', description: 'Book purchase', amount: 1200, category: 'Education', type: 'expense' },
]

export const monthlyData = [
  { month: 'Jan', balance: 62000, income: 78000, expenses: 16000 },
  { month: 'Feb', balance: 71000, income: 84000, expenses: 13000 },
  { month: 'Mar', balance: 89673, income: 121500, expenses: 31827 },
  { month: 'Apr', balance: 93800, income: 98000, expenses: 23400 },
  { month: 'May', balance: 101200, income: 110000, expenses: 26600 },
  { month: 'Jun', balance: 108400, income: 117000, expenses: 27800 },
]

export const typeOptions = ['all', 'income', 'expense']

export const sortOptions = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Highest amount' },
  { value: 'amount-asc', label: 'Lowest amount' },
]
