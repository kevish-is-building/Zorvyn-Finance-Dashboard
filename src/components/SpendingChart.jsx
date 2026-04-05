import { useMemo } from 'react'
import SectionHeader from './SectionHeader'
import { formatCurrency } from '../utils/formatters'

const CHART_COLORS = ['#3b82f6', '#6366f1', '#14b8a6', '#f97316', '#e11d48', '#84cc16', '#06b6d4']

export default function SpendingChart({ items, total }) {
  const breakdownItems = useMemo(() => {
    if (total <= 0) {
      return items.map((item) => ({ ...item, share: 0 }))
    }

    return items.map((item) => ({
      ...item,
      share: (item.amount / total) * 100,
    }))
  }, [items, total])

  const topItem = breakdownItems[0] ?? null

  return (
    <div className="ui-panel rounded-3xl p-4 sm:p-5">
      <SectionHeader
        title="Spending Breakdown"
        subtitle="Expense categories based on current transaction data"
      />

      <div className="grid gap-3">
        {items.length > 0 ? (
          <>
            <div className="rounded-2xl border border-cyan-200/55 bg-linear-to-br from-cyan-50/70 to-white p-3 dark:border-cyan-900/50 dark:from-cyan-950/20 dark:to-slate-900">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan-700 dark:text-cyan-300">Top category</p>
                  <p className="truncate text-base font-semibold text-slate-800 dark:text-slate-100">{topItem?.category}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{formatCurrency(topItem?.amount ?? 0)}</p>
                </div>
                <div className="rounded-xl border border-cyan-200/70 bg-white/80 px-3 py-2 text-right dark:border-cyan-900/70 dark:bg-slate-900/60">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">Share</p>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{topItem?.percentage ?? 0}%</p>
                </div>
              </div>

              <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-slate-200/75 dark:bg-slate-800/70">
                {breakdownItems.map((item, index) => (
                  <span
                    key={item.category}
                    className="h-full"
                    style={{
                      width: `${item.share}%`,
                      backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                    }}
                    title={`${item.category}: ${item.percentage}%`}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              {breakdownItems.map((item, index) => (
                <div key={item.category} className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60">
                  <div className="flex min-w-0 items-center justify-between gap-2 text-xs">
                    <span className="flex min-w-0 flex-1 items-center gap-2 text-slate-700 dark:text-slate-200">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                      <span className="truncate font-medium">{item.category}</span>
                    </span>
                    <span className="shrink-0 text-slate-500 dark:text-slate-400">{formatCurrency(item.amount)}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200/75 dark:bg-slate-800/70">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${item.share}%`,
                          backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                        }}
                      />
                    </div>
                    <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
            <div className="rounded-xl border border-dashed border-cyan-300/60 bg-cyan-50/65 px-4 py-6 text-center text-sm text-slate-600 dark:border-cyan-800/70 dark:bg-cyan-950/18 dark:text-slate-300">
            No expense data available yet.
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Total tracked expenses: {formatCurrency(total)}</p>
    </div>
  )
}
