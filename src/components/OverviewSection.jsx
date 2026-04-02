
import InsightsPanel from './InsightsPanel'
import SpendingChart from './SpendingChart'
import SummaryCard from './SummaryCard'
import TrendChart from './TrendChart'
import { formatCurrency } from '../utils/formatters'

export default function OverviewSection({
  totals,
  monthlyData,
  expenseBreakdown,
  insights,
  isLoading,
  error,
  onRetry,
}) {
  if (isLoading) {
    return (
      <div className="ui-panel rounded-3xl p-6 text-sm text-cyan-800 dark:text-cyan-300">
          Loading dashboard data from live API...
      </div>
    )
  }

  if (error && monthlyData.length === 0) {
    return (
      <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/20">
        <h3 className="text-base font-semibold text-amber-800 dark:text-amber-300">Could not load transactions</h3>
        <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/40"
        >
          Retry load
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-5">
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

      <section className="">
        <InsightsPanel insights={insights} />
      </section>
    </div>
  )
}
