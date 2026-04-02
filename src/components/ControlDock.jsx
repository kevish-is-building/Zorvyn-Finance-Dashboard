import { AnimatePresence, motion } from 'framer-motion'
import DockSwitch from './DockSwitch'

const MotionDock = motion.div
const MotionControls = motion.div

export default function ControlDock({
  role,
  theme,
  isExpanded,
  onToggleExpanded,
  onToggleRole,
  onToggleTheme,
}) {
  return (
    <MotionDock
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      role="region"
      aria-label="Quick controls"
      className="ui-panel fixed bottom-3 left-3 right-3 z-30 rounded-2xl p-3 sm:left-auto sm:w-[min(220px,calc(100vw-2.5rem))] sm:bottom-5 sm:right-5"
    >
      <button
        type="button"
        className="w-full rounded-xl border border-cyan-300/60 bg-cyan-50/70 px-3 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 dark:border-cyan-800/70 dark:bg-cyan-950/25 dark:text-cyan-300 dark:hover:bg-cyan-950/40"
        aria-expanded={isExpanded}
        aria-controls="quick-controls"
        onClick={onToggleExpanded}
      >
        {isExpanded ? 'Hide toggles' : 'Show toggles'}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <MotionControls
            id="quick-controls"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-2 overflow-hidden"
          >
            <DockSwitch
              label="Role"
              isOn={role === 'admin'}
              onToggle={onToggleRole}
              onText="Admin"
              offText="Viewer"
              ariaLabel={`Switch role to ${role === 'admin' ? 'viewer' : 'admin'}`}
            />
            <DockSwitch
              label="Theme"
              isOn={theme === 'dark'}
              onToggle={onToggleTheme}
              onText="Dark"
              offText="Light"
              ariaLabel={`Switch theme to ${theme === 'dark' ? 'light' : 'dark'}`}
            />
          </MotionControls>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-slate-500 dark:text-slate-400"
          >
            Role: {role} • Theme: {theme}
          </motion.p>
        )}
      </AnimatePresence>
    </MotionDock>
  )
}
