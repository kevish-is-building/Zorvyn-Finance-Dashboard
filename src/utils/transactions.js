import { formatCurrency } from './formatters'

export const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date-desc',
}

export const typeOptions = ['all', 'income', 'expense']

export const sortOptions = [
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'amount-desc', label: 'Highest amount' },
  { value: 'amount-asc', label: 'Lowest amount' },
]

function getSafeTimestamp(dateValue) {
  if (!dateValue) return null

  const value = new Date(`${dateValue}T00:00:00`).getTime()
  return Number.isNaN(value) ? null : value
}

export function getCategories(transactions) {
  return [...new Set(transactions.map((item) => item.category))].sort()
}

export function getTotals(transactions) {
  return transactions.reduce(
    (summary, transaction) => {
      if (transaction.type === 'income') {
        summary.income += transaction.amount
      } else {
        summary.expenses += transaction.amount
      }

      summary.balance = summary.income - summary.expenses
      return summary
    },
    { income: 0, expenses: 0, balance: 0 },
  )
}

export function filterTransactions(transactions, filters) {
  const searchValue = filters.search.trim().toLowerCase()

  const filtered = transactions.filter((transaction) => {
    const matchesSearch =
      searchValue === '' ||
      transaction.description.toLowerCase().includes(searchValue) ||
      transaction.category.toLowerCase().includes(searchValue)

    const matchesType = filters.type === 'all' || transaction.type === filters.type
    const matchesCategory = filters.category === 'all' || transaction.category === filters.category

    return matchesSearch && matchesType && matchesCategory
  })

  const [sortField, sortDirection] = filters.sortBy.split('-')

  return [...filtered].sort((first, second) => {
    if (sortField === 'amount') {
      return sortDirection === 'asc' ? first.amount - second.amount : second.amount - first.amount
    }

    const firstDate = getSafeTimestamp(first.date) || 0
    const secondDate = getSafeTimestamp(second.date) || 0
    return sortDirection === 'asc' ? firstDate - secondDate : secondDate - firstDate
  })
}

export function getExpenseBreakdown(transactions) {
  const expenseTransactions = transactions.filter((item) => item.type === 'expense')
  const totalExpenseAmount = expenseTransactions.reduce((sum, item) => sum + item.amount, 0)

  const grouped = expenseTransactions.reduce((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] || 0) + item.amount
    return accumulator
  }, {})

  const items = Object.entries(grouped)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenseAmount === 0 ? 0 : Math.round((amount / totalExpenseAmount) * 100),
    }))
    .sort((first, second) => second.amount - first.amount)

  return { items, totalExpenseAmount }
}

export function getMonthlyData(transactions) {
  const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'short', year: '2-digit' })
  const grouped = {}

  transactions.forEach((transaction) => {
    const date = new Date(`${transaction.date}T00:00:00`)
    if (Number.isNaN(date.getTime())) {
      return
    }

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!grouped[key]) {
      grouped[key] = {
        income: 0,
        expenses: 0,
      }
    }

    if (transaction.type === 'income') {
      grouped[key].income += transaction.amount
    } else {
      grouped[key].expenses += transaction.amount
    }
  })

  const keys = Object.keys(grouped).sort()

  if (keys.length === 0) {
    return []
  }

  let runningBalance = 0
  return keys.map((key) => {
    const [year, month] = key.split('-').map(Number)
    const monthDate = new Date(year, month - 1, 1)
    const income = grouped[key].income
    const expenses = grouped[key].expenses
    runningBalance += income - expenses

    return {
      month: monthFormatter.format(monthDate),
      income,
      expenses,
      balance: runningBalance,
    }
  })
}

export function getInsights(expenseBreakdown, monthlyData, totals) {
  const highestCategory = expenseBreakdown.items[0]
  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  const balanceDifference = currentMonth && previousMonth ? currentMonth.balance - previousMonth.balance : 0
  const expenseRate = totals.income === 0 ? 0 : Math.round((totals.expenses / totals.income) * 100)

  return [
    {
      title: 'Highest spend',
      value: highestCategory ? highestCategory.category : 'No data',
      note: highestCategory
        ? `${formatCurrency(highestCategory.amount)} spent in this category.`
        : 'Add expenses to see category insights.',
    },
    {
      title: 'Monthly comparison',
      value: currentMonth && previousMonth ? `${balanceDifference >= 0 ? '+' : ''}${formatCurrency(balanceDifference)}` : 'No comparison',
      note: currentMonth && previousMonth
        ? `Balance changed compared to ${previousMonth.month}.`
        : 'Need at least two months of transactions for trend comparison.',
    },
    {
      title: 'Expense ratio',
      value: `${expenseRate}% of income`,
      note: 'A quick signal for how much incoming money is being used.',
    },
  ]
}

function serializeCsvValue(value) {
  const normalized = String(value ?? '')
  const escaped = normalized.replaceAll('"', '""')
  return `"${escaped}"`
}

export function toCsv(transactions) {
  const header = ['id', 'date', 'description', 'category', 'type', 'amount']
  const rows = transactions.map((item) => [
    item.id,
    item.date,
    item.description,
    item.category,
    item.type,
    item.amount,
  ])

  return [header, ...rows].map((row) => row.map(serializeCsvValue).join(',')).join('\n')
}

export function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
