export default function SidebarTabs({ activeTab, onChangeTab, recordsCount }) {
  const buttonBase =
    'rounded-2xl border p-3.5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60'

  return (
    <aside className="ui-panel h-fit rounded-3xl p-4 sm:rounded-4xl sm:p-5 lg:sticky lg:top-5 lg:self-start">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-300">Navigation</p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl dark:text-slate-100">Dashboard tabs</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Switch between overview and transaction workspace.
      </p>

      <div className="mt-4 rounded-2xl border border-cyan-300/40 bg-cyan-50/70 px-3 py-2 text-xs font-semibold text-cyan-800 dark:border-cyan-700/60 dark:bg-cyan-950/30 dark:text-cyan-300">
        Synced records: {recordsCount}
      </div>

      <nav className="mt-5 grid gap-3" aria-label="Dashboard sections">
        <button
          type="button"
          className={`${buttonBase} ${
            activeTab === 'overview'
              ? 'border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-950/40 dark:text-cyan-100'
              : 'border-slate-300/70 bg-white/70 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200'
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
              ? 'border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-950/40 dark:text-cyan-100'
              : 'border-slate-300/70 bg-white/70 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200'
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
