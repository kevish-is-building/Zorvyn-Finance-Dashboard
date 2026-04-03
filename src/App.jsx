import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import ControlDock from './components/ControlDock'
import OverviewSection from './components/OverviewSection'
import SidebarTabs from './components/SidebarTabs'
import TransactionsSection from './components/TransactionsSection'
import { useFinanceStore } from './store/useFinanceStore'
import {
  filterTransactions,
  getCategories,
  getExpenseBreakdown,
  getInsights,
  getMonthlyData,
  getTotals,
  sortOptions,
  typeOptions,
} from './utils/transactions'

const MotionHeader = motion.header
const MotionOverview = motion.div
const MotionTransactions = motion.section
const MotionOrb = motion.div

function App() {
  const role = useFinanceStore((state) => state.role)
  const theme = useFinanceStore((state) => state.theme)
  const activeTab = useFinanceStore((state) => state.activeTab)
  const isControlsExpanded = useFinanceStore((state) => state.isControlsExpanded)
  const filters = useFinanceStore((state) => state.filters)
  const transactions = useFinanceStore((state) => state.transactions)
  const isLoading = useFinanceStore((state) => state.isLoading)
  const isSaving = useFinanceStore((state) => state.isSaving)
  const error = useFinanceStore((state) => state.error)
  const editingTransactionId = useFinanceStore((state) => state.editingTransactionId)

  const initialize = useFinanceStore((state) => state.initialize)
  const retryInitialize = useFinanceStore((state) => state.retryInitialize)
  const setActiveTab = useFinanceStore((state) => state.setActiveTab)
  const setFilter = useFinanceStore((state) => state.setFilter)
  const resetFilters = useFinanceStore((state) => state.resetFilters)
  const clearError = useFinanceStore((state) => state.clearError)
  const addTransaction = useFinanceStore((state) => state.addTransaction)
  const saveTransaction = useFinanceStore((state) => state.saveTransaction)
  const removeTransaction = useFinanceStore((state) => state.removeTransaction)
  const startEditing = useFinanceStore((state) => state.startEditing)
  const cancelEditing = useFinanceStore((state) => state.cancelEditing)
  const toggleControlsExpanded = useFinanceStore((state) => state.toggleControlsExpanded)
  const toggleRole = useFinanceStore((state) => state.toggleRole)
  const toggleTheme = useFinanceStore((state) => state.toggleTheme)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const categories = useMemo(() => {
    return getCategories(transactions)
  }, [transactions])

  const totals = useMemo(() => {
    return getTotals(transactions)
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, filters)
  }, [filters, transactions])

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions])

  const expenseBreakdown = useMemo(() => {
    return getExpenseBreakdown(transactions)
  }, [transactions])

  const insights = useMemo(() => {
    return getInsights(expenseBreakdown, monthlyData, totals)
  }, [expenseBreakdown, monthlyData, totals])

  const editingTransaction = useMemo(() => {
    return transactions.find((item) => item.id === editingTransactionId) || null
  }, [editingTransactionId, transactions])

  async function handleCreateTransaction(payload) {
    try {
      await addTransaction(payload)
    } catch {
      // Store already captures and surfaces API errors.
    }
  }

  async function handleUpdateTransaction(payload) {
    if (!editingTransaction) {
      return
    }

    try {
      await saveTransaction(editingTransaction.id, payload)
    } catch {
      // Store already captures and surfaces API errors.
    }
  }

  async function handleDeleteTransaction(transactionId) {
    if (!window.confirm('Delete this transaction? This action cannot be undone.')) {
      return
    }

    try {
      await removeTransaction(transactionId)
    } catch {
      // Store already captures and surfaces API errors.
    }
  }

  return (
    <div className="app-shell relative min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <MotionOrb
          className="absolute -left-18 top-22 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/24"
          animate={{ x: [0, 40, 0], y: [0, -16, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <MotionOrb
          className="absolute -right-17.5 -top-7.5 h-64 w-64 rounded-full bg-amber-300/26 blur-3xl dark:bg-sky-500/22"
          animate={{ x: [0, -46, 0], y: [0, 22, 0], scale: [1.02, 0.95, 1.02] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 pb-36 pt-5 sm:px-6 lg:px-8">
        <MotionHeader
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="ui-panel sparkle-grid mb-6 overflow-hidden rounded-4xl p-7 sm:p-8"
        >
          <p className="inline-flex rounded-full border border-cyan-400/35 bg-cyan-400/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-300">
            Finance Dashboard UI
          </p>
          <h1 className="mt-3 max-w-[22ch] text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-slate-50">
            Build financial clarity with a cockpit, not a spreadsheet.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Built with Zustand state management, a live API data layer, Tailwind CSS, Framer Motion,
            role-based behavior, and a layout optimized for desktop and mobile.
          </p>
        </MotionHeader>

        <main className="grid items-start gap-4 md:gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <SidebarTabs
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            recordsCount={transactions.length}
          />

          <section className="grid min-w-0 gap-4 md:gap-5">
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
                  <OverviewSection
                    totals={totals}
                    monthlyData={monthlyData}
                    expenseBreakdown={expenseBreakdown}
                    insights={insights}
                    isLoading={isLoading}
                    error={error}
                    onRetry={retryInitialize}
                  />
                </MotionOverview>
              ) : (
                <MotionTransactions
                  key="transactions"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-5"
                >
                  <TransactionsSection
                    role={role}
                    filters={filters}
                    categories={categories}
                    typeOptions={typeOptions}
                    sortOptions={sortOptions}
                    filteredTransactions={filteredTransactions}
                    editingTransaction={editingTransaction}
                    isLoading={isLoading}
                    isSaving={isSaving}
                    error={error}
                    onRetry={retryInitialize}
                    onFilterChange={setFilter}
                    onFilterReset={resetFilters}
                    onCreateTransaction={handleCreateTransaction}
                    onUpdateTransaction={handleUpdateTransaction}
                    onCancelEdit={cancelEditing}
                    onStartEdit={startEditing}
                    onDelete={handleDeleteTransaction}
                    onClearError={clearError}
                  />
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
        onToggleExpanded={toggleControlsExpanded}
        onToggleRole={toggleRole}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}

export default App
