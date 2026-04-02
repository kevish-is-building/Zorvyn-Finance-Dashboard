export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}
