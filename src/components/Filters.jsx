export default function Filters({
  filters,
  categories,
  typeOptions,
  sortOptions,
  onChange,
  onReset,
}) {
  const labelClass = 'text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400'
  const controlClass =
    'w-full rounded-lg border border-slate-300/80 bg-white/85 px-2.5 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-700 dark:focus:ring-cyan-950'

  return (
    <div className="rounded-2xl border border-slate-300/70 bg-white/65 p-3 dark:border-slate-700 dark:bg-slate-900/55">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
        <div className="grid gap-1.5 sm:col-span-2 lg:col-span-5">
        <label htmlFor="search" className={labelClass}>Search</label>
        <input
          id="search"
          type="text"
          placeholder="Search description or category"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
          className={controlClass}
        />
      </div>

        <div className="grid gap-1.5 lg:col-span-2">
        <label htmlFor="typeFilter" className={labelClass}>Type</label>
        <select
          id="typeFilter"
          value={filters.type}
          onChange={(event) => onChange('type', event.target.value)}
          className={controlClass}
        >
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>

        <div className="grid gap-1.5 lg:col-span-2">
        <label htmlFor="categoryFilter" className={labelClass}>Category</label>
        <select
          id="categoryFilter"
          value={filters.category}
          onChange={(event) => onChange('category', event.target.value)}
          className={controlClass}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

        <div className="grid gap-1.5 lg:col-span-2">
        <label htmlFor="sortBy" className={labelClass}>Sort</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(event) => onChange('sortBy', event.target.value)}
          className={controlClass}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

        <button
          type="button"
          onClick={onReset}
          className="self-end rounded-lg border border-cyan-300/60 bg-cyan-50/80 px-3 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-800 dark:bg-cyan-950/30 dark:text-cyan-300 dark:hover:bg-cyan-950/40 lg:col-span-1"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
