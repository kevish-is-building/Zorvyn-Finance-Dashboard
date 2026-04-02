import { motion } from 'framer-motion'

const MotionSummaryCard = motion.article

const toneClasses = {
  balance: 'from-sky-400/26 via-sky-100/35 to-white/60 dark:from-sky-500/24 dark:via-sky-900/18 dark:to-slate-900',
  income: 'from-emerald-400/26 via-emerald-100/35 to-white/60 dark:from-emerald-500/24 dark:via-emerald-900/18 dark:to-slate-900',
  expense: 'from-rose-300/32 via-rose-100/40 to-white/70 dark:from-rose-500/24 dark:via-rose-900/20 dark:to-slate-900',
}

const toneLabelClasses = {
  balance: 'text-sky-700 dark:text-sky-300',
  income: 'text-emerald-700 dark:text-emerald-300',
  expense: 'text-rose-700 dark:text-rose-300',
}

export default function SummaryCard({ title, value, subtitle, tone }) {
  return (
    <MotionSummaryCard
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -4 }}
      className={`ui-panel rounded-3xl bg-gradient-to-br p-5 sm:p-6 ${toneClasses[tone]}`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.12em] ${toneLabelClasses[tone]}`}>{title}</p>
      <h2 className="mt-2 break-words text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-slate-50">{value}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
    </MotionSummaryCard>
  )
}
