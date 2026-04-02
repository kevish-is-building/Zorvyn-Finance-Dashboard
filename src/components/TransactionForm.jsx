import { useState } from 'react'

const emptyForm = {
  date: '',
  description: '',
  amount: '',
  category: '',
  type: 'expense',
}

export default function TransactionForm({
  mode = 'create',
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => {
    if (!initialValues) {
      return { ...emptyForm }
    }

    return {
      ...initialValues,
      amount: String(initialValues.amount ?? ''),
    }
  })

  function handleChange(field, value) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.date || !formData.description || !formData.amount || !formData.category) {
      return
    }

    try {
      await onSubmit({
        ...formData,
        amount: Number(formData.amount),
      })

      if (mode === 'create') {
        setFormData(emptyForm)
      }
    } catch {
      // Errors are surfaced by the store-level error banner.
    }
  }

  const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400'
  const controlClass =
    'w-full rounded-lg border border-slate-300/80 bg-white/85 px-2.5 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-cyan-700 dark:focus:ring-cyan-950'

  return (
    <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12" onSubmit={handleSubmit}>
      <div className="grid gap-1.5 lg:col-span-2 xl:col-span-2">
        <label htmlFor="transactionDate" className={labelClass}>Date</label>
        <input
          id="transactionDate"
          type="date"
          value={formData.date}
          onChange={(event) => handleChange('date', event.target.value)}
          className={controlClass}
        />
      </div>

      <div className="grid gap-1.5 lg:col-span-3 xl:col-span-3">
        <label htmlFor="transactionDescription" className={labelClass}>Description</label>
        <input
          id="transactionDescription"
          type="text"
          placeholder="e.g. Client payment"
          value={formData.description}
          onChange={(event) => handleChange('description', event.target.value)}
          className={controlClass}
        />
      </div>

      <div className="grid gap-1.5 lg:col-span-1 xl:col-span-2">
        <label htmlFor="transactionAmount" className={labelClass}>Amount</label>
        <input
          id="transactionAmount"
          type="number"
          min="0"
          placeholder="0"
          value={formData.amount}
          onChange={(event) => handleChange('amount', event.target.value)}
          className={controlClass}
        />
      </div>

      <div className="grid gap-1.5 lg:col-span-2 xl:col-span-2">
        <label htmlFor="transactionCategory" className={labelClass}>Category</label>
        <input
          id="transactionCategory"
          type="text"
          placeholder="e.g. Salary"
          value={formData.category}
          onChange={(event) => handleChange('category', event.target.value)}
          className={controlClass}
        />
      </div>

      <div className="grid gap-1.5 lg:col-span-2 xl:col-span-2">
        <label htmlFor="transactionType" className={labelClass}>Type</label>
        <select
          id="transactionType"
          value={formData.type}
          onChange={(event) => handleChange('type', event.target.value)}
          className={controlClass}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:col-span-6 xl:col-span-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-linear-to-r from-cyan-600 to-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mode === 'edit' ? 'Save changes' : 'Add transaction'}
        </button>
        {mode === 'edit' ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}
