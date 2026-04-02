import { formatCurrency, formatDate } from '../utils/formatters'

export default function TransactionsTable({ items, role }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center dark:border-slate-700 dark:bg-slate-800/60">
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">No transactions found</h4>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Try changing your filters or add a new transaction as admin.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-190 border-collapse">
          <thead>
            <tr>
              {['Date', 'Description', 'Category', 'Type', 'Amount', 'Access'].map((head) => (
                <th
                  key={head}
                  className={`border-b border-slate-200 pb-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:border-slate-700 dark:text-slate-400 ${
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
              <tr key={transaction.id}>
                <td className="border-b border-slate-200 py-3 text-sm dark:border-slate-800">{formatDate(transaction.date)}</td>
                <td className="border-b border-slate-200 py-3 text-sm dark:border-slate-800">{transaction.description}</td>
                <td className="border-b border-slate-200 py-3 text-sm dark:border-slate-800">{transaction.category}</td>
                <td className="border-b border-slate-200 py-3 text-sm dark:border-slate-800">
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
                  className={`border-b border-slate-200 py-3 text-right text-sm font-semibold dark:border-slate-800 ${
                    transaction.type === 'income'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="border-b border-slate-200 py-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  {role === 'admin' ? 'Can edit/add' : 'View only'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {items.map((transaction) => (
          <article
            key={transaction.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70"
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
              <p>
                <span className="font-medium text-slate-500 dark:text-slate-400">Access:</span>{' '}
                {role === 'admin' ? 'Can edit/add' : 'View only'}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
