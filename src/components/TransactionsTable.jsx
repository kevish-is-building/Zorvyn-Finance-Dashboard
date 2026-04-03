import { motion, useReducedMotion } from 'framer-motion'
import { formatCurrency, formatDate } from '../utils/formatters'

const MotionWrap = motion.div
const MotionRow = motion.tr
const MotionCard = motion.article

export default function TransactionsTable({
  items,
  role,
  editingTransactionId,
  isSaving,
  onEdit,
  onDelete,
}) {
  const shouldReduceMotion = useReducedMotion()

  if (items.length === 0) {
    return (
      <MotionWrap
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        className="rounded-2xl border border-dashed border-cyan-300/60 bg-cyan-50/65 px-5 py-8 text-center dark:border-cyan-800/70 dark:bg-cyan-950/15"
      >
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">No transactions found</h4>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Try changing your filters or add a new transaction as admin.
        </p>
      </MotionWrap>
    )
  }

  return (
    <div className="grid gap-3">
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-300/70 bg-white/75 p-2 dark:border-slate-700 dark:bg-slate-900/65 lg:block">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr>
              {['Date', 'Description', 'Category', 'Type', 'Amount', 'Actions'].map((head) => (
                <th
                  key={head}
                  className={`border-b border-slate-300/70 px-2 pb-3 text-left text-xs font-bold uppercase tracking-[0.1em] text-slate-500 dark:border-slate-700 dark:text-slate-400 ${
                    head === 'Amount' ? 'text-right' : ''
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((transaction, index) => (
              <MotionRow
                key={transaction.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.18,
                  delay: shouldReduceMotion ? 0 : Math.min(index * 0.012, 0.12),
                }}
                className="transition hover:bg-cyan-50/60 dark:hover:bg-cyan-950/18"
              >
                <td className="border-b border-slate-200/80 px-2 py-3 text-sm dark:border-slate-800">{formatDate(transaction.date)}</td>
                <td className="border-b border-slate-200/80 px-2 py-3 text-sm dark:border-slate-800">{transaction.description}</td>
                <td className="border-b border-slate-200/80 px-2 py-3 text-sm dark:border-slate-800">{transaction.category}</td>
                <td className="border-b border-slate-200/80 px-2 py-3 text-sm dark:border-slate-800">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td
                  className={`border-b border-slate-200/80 px-2 py-3 text-right text-sm font-semibold dark:border-slate-800 ${
                    transaction.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="border-b border-slate-200/80 px-2 py-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  {role === 'admin' ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(transaction.id)}
                        className={`cursor-pointer rounded-lg border px-2 py-1 text-xs font-semibold transition ${
                          editingTransactionId === transaction.id
                            ? 'border-cyan-400 bg-cyan-100 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300'
                            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {editingTransactionId === transaction.id ? 'Editing' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(transaction.id)}
                        disabled={isSaving}
                        className="cursor-pointer rounded-lg border border-rose-300 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/40"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <span
                      tabIndex={0}
                      className="group relative inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600 outline-none dark:border-slate-600 dark:text-slate-300"
                      aria-label="Switch to role admin"
                    >
                      i
                      <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                        Switch to role admin
                      </span>
                    </span>
                  )}
                </td>
              </MotionRow>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {items.map((transaction, index) => (
          <MotionCard
            key={transaction.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.18,
              delay: shouldReduceMotion ? 0 : Math.min(index * 0.018, 0.18),
            }}
            className="ui-card rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70"
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{transaction.description}</h4>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                  transaction.type === 'income'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
                }`}
              >
                {transaction.type}
              </span>
            </div>

            <div className="mt-3 grid gap-1 text-sm text-slate-600 dark:text-slate-300">
              <p>
                <span className="font-medium text-slate-500 dark:text-slate-400">Date:</span> {formatDate(transaction.date)}
              </p>
              <p>
                <span className="font-medium text-slate-500 dark:text-slate-400">Category:</span> {transaction.category}
              </p>
              <p className="font-semibold">
                <span className="font-medium text-slate-500 dark:text-slate-400">Amount:</span>{' '}
                <span
                  className={
                    transaction.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </p>
              {role === 'admin' ? (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onEdit(transaction.id)}
                    className={`cursor-pointer rounded-lg border px-2 py-1 text-xs font-semibold transition ${
                      editingTransactionId === transaction.id
                        ? 'border-cyan-400 bg-cyan-100 text-cyan-700 dark:border-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {editingTransactionId === transaction.id ? 'Editing' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(transaction.id)}
                    disabled={isSaving}
                    className="cursor-pointer rounded-lg border border-rose-300 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/40"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <p>
                  <span className="font-medium text-slate-500 dark:text-slate-400">Access:</span>{' '}
                  <span
                    tabIndex={0}
                    className="group relative inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600 outline-none dark:border-slate-600 dark:text-slate-300"
                    aria-label="Switch to role admin"
                  >
                    i
                    <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-slate-100 dark:text-slate-900">
                      Switch to role admin
                    </span>
                  </span>
                </p>
              )}
            </div>
          </MotionCard>
        ))}
      </div>
    </div>
  )
}
