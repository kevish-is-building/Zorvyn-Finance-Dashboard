import { useMemo } from 'react'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import SectionHeader from './SectionHeader'
import { formatCurrency } from '../utils/formatters'

const CHART_COLORS = ['#3b82f6', '#6366f1', '#14b8a6', '#f97316', '#e11d48', '#84cc16', '#06b6d4']

ChartJS.register(ArcElement, Tooltip, Legend)

export default function SpendingChart({ items, total }) {
  const labels = useMemo(() => items.map((item) => item.category), [items])
  const amounts = useMemo(() => items.map((item) => item.amount), [items])

  const doughnutData = useMemo(() => ({
    labels,
    datasets: [
      {
        data: amounts,
        borderWidth: 0,
        backgroundColor: items.map((_, index) => CHART_COLORS[index % CHART_COLORS.length]),
        hoverOffset: 8,
      },
    ],
  }), [amounts, items, labels])

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '64%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${formatCurrency(context.raw)} (${items[context.dataIndex].percentage}%)`,
        },
      },
    },
  }

  return (
    <div className="ui-panel rounded-3xl p-5">
      <SectionHeader
        title="Spending Breakdown"
        subtitle="Expense categories based on current transaction data"
      />

      <div className="grid gap-3">
        {items.length > 0 ? (
          <div className="h-56 w-full rounded-2xl border border-cyan-200/50 bg-gradient-to-b from-cyan-50/70 to-white p-3 dark:border-cyan-900/50 dark:from-cyan-950/20 dark:to-slate-900">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
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
