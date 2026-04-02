import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import SectionHeader from './SectionHeader'
import { formatCurrency } from '../utils/formatters'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function TrendChart({ data }) {
  const labels = data.map((item) => item.month)
  const balances = data.map((item) => item.balance)

  const lineData = {
    labels,
    datasets: [
      {
        data: balances,
        borderColor: '#0891b2',
        borderWidth: 2.5,
        backgroundColor: 'rgba(59, 130, 246, 0.25)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#0891b2',
      },
    ],
  }

  const sharedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Balance: ${formatCurrency(context.raw)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#64748b',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.18)',
        },
      },
      y: {
        ticks: {
          color: '#64748b',
          callback: (value) => formatCurrency(value),
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.18)',
        },
      },
    },
  }

  return (
    <div className="ui-panel rounded-3xl p-5">
      <SectionHeader
        title="Balance Trend"
        subtitle="A quick view of how the balance moves over time"
      />

      <div className="h-56 w-full rounded-2xl border border-cyan-200/50 bg-gradient-to-b from-cyan-50/70 to-white p-3 dark:border-cyan-900/50 dark:from-cyan-950/20 dark:to-slate-900">
        {data.length > 0 ? (
          <Line data={lineData} options={sharedOptions} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            No trend data available.
          </div>
        )}
      </div>
    </div>
  )
}
