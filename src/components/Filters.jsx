export default function Filters({
  filters,
  categories,
  typeOptions,
  sortOptions,
  onChange,
  onReset,
}) {
  const labelClass = 'text-sm text-slate-500 dark:text-slate-400'
  const controlClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="grid gap-2 lg:col-span-2">
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

      <div className="grid gap-2">
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

      <div className="grid gap-2">
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

      <div className="grid gap-2">
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
        className="self-end rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        Reset
      </button>
    </div>
  )
}
