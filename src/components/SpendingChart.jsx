import SectionHeader from './SectionHeader'
import { formatCurrency } from '../utils/formatters'

export default function SpendingChart({ items, total }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <SectionHeader
        title="Spending Breakdown"
        subtitle="Expense categories based on current transaction data"
      />

      <div className="grid gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.category} className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-slate-900 dark:text-slate-100">{item.category}</strong>
                <span className="text-xs text-slate-500 dark:text-slate-400">{formatCurrency(item.amount)}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${Math.max(item.percentage, 4)}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.percentage}%</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400">
            No expense data available yet.
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Total tracked expenses: {formatCurrency(total)}</p>
    </div>
  )
}
