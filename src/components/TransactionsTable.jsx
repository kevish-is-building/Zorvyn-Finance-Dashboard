import { formatCurrency, formatDate } from '../utils/formatters'

export default function TransactionsTable({
  items,
  role,
  editingTransactionId,
  isSaving,
  onEdit,
  onDelete,
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-cyan-300/60 bg-cyan-50/65 px-5 py-8 text-center dark:border-cyan-800/70 dark:bg-cyan-950/15">
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">No transactions found</h4>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Try changing your filters or add a new transaction as admin.
        </p>
      </div>
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
            {items.map((transaction) => (
              <tr key={transaction.id} className="transition hover:bg-cyan-50/60 dark:hover:bg-cyan-950/18">
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
                    'View only'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {items.map((transaction) => (
          <article
            key={transaction.id}
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
                  <span className="font-medium text-slate-500 dark:text-slate-400">Access:</span> View only
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
