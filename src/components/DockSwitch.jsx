export default function DockSwitch({ label, isOn, onToggle, onText, offText, ariaLabel }) {
  return (
    <div className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isOn}
        aria-label={ariaLabel}
        className="inline-flex w-full items-center justify-between rounded-full border border-slate-300/80 bg-white/85 px-3 py-2 text-sm text-slate-900 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      >
        <span
          className={`relative h-6 w-11 rounded-full border transition ${
            isOn
              ? 'border-cyan-400 bg-cyan-100 dark:border-cyan-500 dark:bg-cyan-900/70'
              : 'border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-700'
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-4 w-4 transform-gpu rounded-full bg-white shadow-sm transition duration-200 ${
              isOn ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </span>
        <span className="min-w-12 text-right font-semibold">{isOn ? onText : offText}</span>
      </button>
    </div>
  )
}
