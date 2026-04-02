import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import ControlDock from './components/ControlDock'
import Filters from './components/Filters'
import InsightsPanel from './components/InsightsPanel'
import SectionHeader from './components/SectionHeader'
import SidebarTabs from './components/SidebarTabs'
import SpendingChart from './components/SpendingChart'
import SummaryCard from './components/SummaryCard'
import TransactionForm from './components/TransactionForm'
import TransactionsTable from './components/TransactionsTable'
import TrendChart from './components/TrendChart'
import {
  STORAGE_KEYS,
  initialTransactions,
  monthlyData,
  sortOptions,
  typeOptions,
} from './data/mockData'
import { formatCurrency, getSavedValue } from './utils/formatters'

const MotionHeader = motion.header
const MotionOverview = motion.div
const MotionTransactions = motion.section

function App() {
  const [role, setRole] = useState(() => getSavedValue(STORAGE_KEYS.role, 'viewer'))
  const [theme, setTheme] = useState(() => getSavedValue(STORAGE_KEYS.theme, 'light'))
  const [transactions, setTransactions] = useState(() => getSavedValue(STORAGE_KEYS.transactions, initialTransactions))
  const [activeTab, setActiveTab] = useState('overview')
  const [isControlsExpanded, setIsControlsExpanded] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date-desc',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, JSON.stringify(role))
  }, [role])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme))
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions))
  }, [transactions])

  const categories = useMemo(() => {
    return [...new Set(transactions.map((item) => item.category))].sort()
  }, [transactions])

  const totals = useMemo(() => {
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
  }, [transactions])

  const filteredTransactions = useMemo(() => {
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

      const firstDate = new Date(first.date).getTime()
      const secondDate = new Date(second.date).getTime()
      return sortDirection === 'asc' ? firstDate - secondDate : secondDate - firstDate
    })
  }, [filters, transactions])

  const expenseBreakdown = useMemo(() => {
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
  }, [transactions])

  const insights = useMemo(() => {
    const highestCategory = expenseBreakdown.items[0]
    const currentMonth = monthlyData[monthlyData.length - 1]
    const previousMonth = monthlyData[monthlyData.length - 2]
    const balanceDifference = currentMonth.balance - previousMonth.balance
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
        value: `${balanceDifference >= 0 ? '+' : ''}${formatCurrency(balanceDifference)}`,
        note: `Balance changed compared to ${previousMonth.month}.`,
      },
      {
        title: 'Expense ratio',
        value: `${expenseRate}% of income`,
        note: 'A quick signal for how much of the incoming money is being used.',
      },
    ]
  }, [expenseBreakdown.items, totals.expenses, totals.income])

  function handleFilterChange(field, value) {
    setFilters((current) => ({ ...current, [field]: value }))
  }

  function handleFilterReset() {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      sortBy: 'date-desc',
    })
  }

  function handleAddTransaction(transaction) {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    }

    setTransactions((current) => [newTransaction, ...current])
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full px-4 pb-36 pt-6 sm:px-6 lg:px-8">
        <MotionHeader
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6 rounded-3xl border border-slate-200 bg-linear-to-br from-blue-500/10 via-white to-white p-6 shadow-sm dark:border-slate-800 dark:from-blue-900/30 dark:via-slate-900 dark:to-slate-900"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400">
            Finance Dashboard UI
          </p>
          <h1 className="mt-2 max-w-[14ch] text-4xl font-semibold leading-tight sm:text-5xl">
            Track money without turning the UI into a tax form.
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Built with React state, Tailwind CSS, Framer Motion micro-animations, role-based behavior,
            and a layout optimized for desktop and mobile.
          </p>
        </MotionHeader>

        <main className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarTabs
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            recordsCount={transactions.length}
          />

          <section className="grid gap-5">
            <AnimatePresence mode="wait" initial={false}>
              {activeTab === 'overview' ? (
                <MotionOverview
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-5"
                >
                  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <SummaryCard
                      title="Total Balance"
                      value={formatCurrency(totals.balance)}
                      subtitle="Income minus expenses"
                      tone="balance"
                    />
                    <SummaryCard
                      title="Income"
                      value={formatCurrency(totals.income)}
                      subtitle="All incoming transactions"
                      tone="income"
                    />
                    <SummaryCard
                      title="Expenses"
                      value={formatCurrency(totals.expenses)}
                      subtitle="All outgoing transactions"
                      tone="expense"
                    />
                  </section>

                  <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                    <TrendChart data={monthlyData} />
                    <SpendingChart items={expenseBreakdown.items} total={expenseBreakdown.totalExpenseAmount} />
                  </section>

                  <InsightsPanel insights={insights} />
                </MotionOverview>
              ) : (
                <MotionTransactions
                  key="transactions"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <SectionHeader
                    title="Transactions"
                    subtitle="Search, filter, and sort through the activity list"
                    action={
                      <span className="inline-flex min-h-8 items-center rounded-full border border-slate-300 bg-slate-50 px-3 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Current role: {role}
                      </span>
                    }
                  />

                  <Filters
                    filters={filters}
                    categories={categories}
                    typeOptions={typeOptions}
                    sortOptions={sortOptions}
                    onChange={handleFilterChange}
                    onReset={handleFilterReset}
                  />

                  {role === 'admin' ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                      <SectionHeader
                        title="Admin actions"
                        subtitle="Simple frontend-only role simulation for this assignment"
                      />
                      <TransactionForm onAdd={handleAddTransaction} />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      Viewer mode is active. You can inspect data, but add/edit controls stay hidden.
                    </div>
                  )}

                  <TransactionsTable items={filteredTransactions} role={role} />
                </MotionTransactions>
              )}
            </AnimatePresence>
          </section>
        </main>
      </div>

      <ControlDock
        role={role}
        theme={theme}
        isExpanded={isControlsExpanded}
        onToggleExpanded={() => setIsControlsExpanded((current) => !current)}
        onToggleRole={() => setRole(role === 'admin' ? 'viewer' : 'admin')}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    </div>
  )
}

export default App
