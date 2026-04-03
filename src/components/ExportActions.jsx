import { downloadTextFile, toCsv } from '../utils/transactions'

export default function ExportActions({ items }) {
  function exportCsv() {
    const csv = toCsv(items)
    downloadTextFile('transactions-export.csv', csv, 'text/csv;charset=utf-8')
  }

  function exportJson() {
    const content = JSON.stringify(items, null, 2)
    downloadTextFile('transactions-export.json', content, 'application/json;charset=utf-8')
  }

  const disabled = items.length === 0

  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
      <button
        type="button"
        onClick={exportCsv}
        disabled={disabled}
        className="cursor-pointer rounded-lg border border-cyan-300/70 bg-cyan-50/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.07em] text-cyan-800 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300 dark:hover:bg-cyan-950/45"
      >
        Export CSV
      </button>

      <button
        type="button"
        onClick={exportJson}
        disabled={disabled}
        className="cursor-pointer rounded-lg border border-cyan-300/70 bg-cyan-50/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.07em] text-cyan-800 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300 dark:hover:bg-cyan-950/45"
      >
        Export JSON
      </button>

      <span className="w-full text-[11px] font-medium leading-relaxed text-slate-600 sm:w-auto dark:text-slate-300">Exports current filtered list ({items.length} rows).</span>
    </div>
  )
}
