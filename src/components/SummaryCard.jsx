import { motion } from 'framer-motion'

const MotionSummaryCard = motion.article

const toneClasses = {
  balance: 'from-blue-500/15 to-transparent',
  income: 'from-emerald-500/15 to-transparent',
  expense: 'from-rose-500/15 to-transparent',
}

export default function SummaryCard({ title, value, subtitle, tone }) {
  return (
    <MotionSummaryCard
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`rounded-2xl border border-slate-200 bg-gradient-to-b p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${toneClasses[tone]}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400">{title}</p>
      <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{value}</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </MotionSummaryCard>
  )
}
