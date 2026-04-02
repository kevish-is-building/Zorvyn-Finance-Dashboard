import ExportActions from './ExportActions'
import Filters from './Filters'
import SectionHeader from './SectionHeader'
import TransactionForm from './TransactionForm'
import TransactionsTable from './TransactionsTable'

export default function TransactionsSection({
  role,
  filters,
  categories,
  typeOptions,
  sortOptions,
  filteredTransactions,
  editingTransaction,
  isLoading,
  isSaving,
  error,
  onRetry,
  onFilterChange,
  onFilterReset,
  onCreateTransaction,
  onUpdateTransaction,
  onCancelEdit,
  onStartEdit,
  onDelete,
  onClearError,
}) {
  const isEditing = Boolean(editingTransaction)

  return (
    <section className="ui-panel grid gap-4 rounded-3xl p-4 sm:p-5">
      <SectionHeader
        title="Transactions"
        subtitle="Search, filter, edit, export, and manage finance activity"
        action={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <ExportActions items={filteredTransactions} />
          </div>
        }
      />

      {isLoading ? (
        <div className="rounded-2xl border border-cyan-300/60 bg-cyan-50/70 px-5 py-4 text-sm text-cyan-800 dark:border-cyan-800/70 dark:bg-cyan-950/20 dark:text-cyan-300">
          Loading transactions from live API...
        </div>
      ) : null}

      {isSaving ? (
        <div className="rounded-2xl border border-blue-300/60 bg-blue-50/70 px-5 py-4 text-sm text-blue-800 dark:border-blue-800/70 dark:bg-blue-950/20 dark:text-blue-300">
          Syncing transaction changes with API...
        </div>
      ) : null}

      {error ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-300">
          <span>{error}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClearError}
              className="rounded-lg border border-amber-300 bg-white px-2 py-1 text-xs font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg border border-amber-300 bg-white px-2 py-1 text-xs font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
            >
              Retry load
            </button>
          </div>
        </div>
      ) : null}

      <Filters
        filters={filters}
        categories={categories}
        typeOptions={typeOptions}
        sortOptions={sortOptions}
        onChange={onFilterChange}
        onReset={onFilterReset}
      />

      {role === 'admin' ? (
        <div className="rounded-2xl border border-dashed border-cyan-300/60 bg-white/65 p-3 sm:p-4 dark:border-cyan-800/70 dark:bg-slate-900/60">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{isEditing ? 'Edit transaction' : 'Admin actions'}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isEditing ? 'Update an existing entry' : 'Create and manage transaction records'}
              </p>
            </div>
            <span className="rounded-full border border-cyan-300/60 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-700 dark:border-cyan-700/60 dark:bg-cyan-950/40 dark:text-cyan-300">
              {isEditing ? 'Editing' : 'Create'}
            </span>
          </div>

          <TransactionForm
            key={isEditing ? `edit-${editingTransaction.id}` : 'create-form'}
            mode={isEditing ? 'edit' : 'create'}
            initialValues={editingTransaction}
            isSubmitting={isSaving}
            onSubmit={isEditing ? onUpdateTransaction : onCreateTransaction}
            onCancel={onCancelEdit}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-cyan-300/60 bg-white/65 p-4 text-sm text-slate-600 dark:border-cyan-800/70 dark:bg-slate-900/60 dark:text-slate-300">
          Viewer mode is active. You can inspect and export data, but create/edit/delete controls stay hidden.
        </div>
      )}

      <TransactionsTable
        items={filteredTransactions}
        role={role}
        editingTransactionId={editingTransaction?.id ?? null}
        isSaving={isSaving}
        onEdit={onStartEdit}
        onDelete={onDelete}
      />
    </section>
  )
}
