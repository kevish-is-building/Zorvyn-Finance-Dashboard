import SectionHeader from './SectionHeader'

export default function InsightsPanel({ insights }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <SectionHeader
        title="Insights"
        subtitle="Simple observations generated from the mock finance data"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight) => (
          <article key={insight.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400">{insight.title}</p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{insight.value}</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{insight.note}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
