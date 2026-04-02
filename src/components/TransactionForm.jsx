import { useState } from 'react'

export default function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    type: 'expense',
  })

  function handleChange(field, value) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.date || !formData.description || !formData.amount || !formData.category) {
      return
    }

    onAdd({
      ...formData,
      amount: Number(formData.amount),
    })

    setFormData({
      date: '',
      description: '',
      amount: '',
      category: '',
      type: 'expense',
    })
  }

  const labelClass = 'text-sm text-slate-500 dark:text-slate-400'
  const controlClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'

  return (
    <form className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label htmlFor="transactionDate" className={labelClass}>Date</label>
        <input
          id="transactionDate"
          type="date"
          value={formData.date}
          onChange={(event) => handleChange('date', event.target.value)}
          className={controlClass}
        />
      </div>

      <div className="grid gap-2">
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

      <div className="grid gap-2">
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

      <div className="grid gap-2">
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

      <div className="grid gap-2">
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

      <button
        type="submit"
        className="self-end rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Add transaction
      </button>
    </form>
  )
}
