export default function SidebarTabs({ activeTab, onChangeTab }) {
  const buttonBase =
    'rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60'

  return (
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400">Navigation</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Dashboard tabs</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Switch between overview and transaction workspace.
      </p>

      <nav className="mt-5 grid gap-3" aria-label="Dashboard sections">
        <button
          type="button"
          className={`${buttonBase} ${
            activeTab === 'overview'
              ? 'border-blue-300 bg-blue-50 dark:border-blue-700/60 dark:bg-blue-950/40'
              : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70'
          }`}
          onClick={() => onChangeTab('overview')}
        >
          <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">Overview</span>
          <small className="text-xs text-slate-500 dark:text-slate-400">Balance, charts, insights</small>
        </button>

        <button
          type="button"
          className={`${buttonBase} ${
            activeTab === 'transactions'
              ? 'border-blue-300 bg-blue-50 dark:border-blue-700/60 dark:bg-blue-950/40'
              : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70'
          }`}
          onClick={() => onChangeTab('transactions')}
        >
          <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">Transactions</span>
          <small className="text-xs text-slate-500 dark:text-slate-400">Filters, entry form, table</small>
        </button>
      </nav>

    </aside>
  )
}
