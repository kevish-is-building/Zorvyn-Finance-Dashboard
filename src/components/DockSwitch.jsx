export default function DockSwitch({ label, isOn, onToggle, onText, offText, ariaLabel }) {
  return (
    <div className="grid gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isOn}
        aria-label={ariaLabel}
        className="inline-flex w-full items-center justify-between rounded-full border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      >
        <span
          className={`relative h-6 w-11 rounded-full border transition ${
            isOn
              ? 'border-blue-400 bg-blue-100 dark:border-blue-500 dark:bg-blue-900/70'
              : 'border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-700'
          }`}
        >
          <span
            className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition ${
              isOn ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </span>
        <span className="min-w-12 text-right font-semibold">{isOn ? onText : offText}</span>
      </button>
    </div>
  )
}
