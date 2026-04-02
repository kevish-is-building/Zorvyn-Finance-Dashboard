export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-slate-50">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
      {action ? <div className="w-full sm:w-auto">{action}</div> : null}
    </div>
  )
}
