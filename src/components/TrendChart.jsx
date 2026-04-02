import SectionHeader from './SectionHeader'
import { formatCurrency } from '../utils/formatters'

export default function TrendChart({ data }) {
  const values = data.map((item) => item.balance)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const width = 100
  const height = 100

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1 || 1)) * width
      const ratio = max === min ? 0.5 : (item.balance - min) / (max - min)
      const y = height - ratio * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <SectionHeader
        title="Balance Trend"
        subtitle="A quick view of how the balance moves over time"
      />

      <div className="grid gap-4">
        <svg viewBox="0 0 100 100" className="h-56 w-full rounded-xl bg-slate-50 dark:bg-slate-800/60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
            </linearGradient>
          </defs>
          <polyline fill="none" stroke="#3b82f6" strokeWidth="2.5" points={points} />
          <polygon fill="url(#trendFill)" points={`0,100 ${points} 100,100`} />
        </svg>

        <div className="grid gap-2 sm:grid-cols-3">
          {data.map((item) => (
            <div key={item.month} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/70">
              <span className="block text-xs text-slate-500 dark:text-slate-400">{item.month}</span>
              <strong className="text-sm text-slate-900 dark:text-slate-100">{formatCurrency(item.balance)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
