# Finance Dashboard UI

A production-minded frontend dashboard focused on the essentials: clear financial visibility, role-aware actions, and reliable feedback states.

## Why this exists

This project is built to ship a clean baseline dashboard quickly.
The goal is not feature bloat. The goal is a tight loop: load data, inspect trends, filter transactions, and manage records safely in admin mode.

## Minimal feature set

1. Overview KPIs: total balance, income, expenses.
2. Balance trend chart (line) for month-over-month movement.
3. Spending breakdown chart (doughnut) with category percentages.
4. Insights cards derived from transaction data.
5. Transactions table/cards with search, type filter, category filter, sort, and reset.
6. Export actions for the currently filtered list (CSV and JSON).
7. Role mode switching (viewer/admin) from the control dock.
8. Admin actions: create, edit, delete transactions.
9. Viewer restrictions: no create/edit/delete controls; info icon tooltip explains switch path to admin.
10. Data-state UX: loading, saving, error banner, and retry.
11. Responsive layout across mobile/tablet/desktop.
12. Theme toggle (light/dark) and persisted preferences.

## UX principles used

1. Clarity first: labels are explicit, money values are consistently formatted, and chart titles explain intent.
2. Role transparency: permissions are visible in the UI; restricted actions are not silently broken.
3. Fast feedback: loading, syncing, and error states are shown in-context where work happens.
4. Safe destructive flow: delete action includes a confirmation step.
5. Progressive disclosure: quick controls can collapse/expand to reduce noise.
6. Consistent interaction language: similar controls share shape, spacing, and behavior.
7. Mobile parity: table behavior has a card alternative, not a degraded desktop copy.
8. Accessible defaults: semantic controls, labels, focus-visible states, and keyboard-focus tooltip support.

## Tech stack

- React 19
- Vite 8
- Zustand (state + persisted preferences)
- Tailwind CSS 4
- Chart.js + react-chartjs-2
- Framer Motion

## Project layout

```text
src/
  components/        # UI building blocks (overview, transactions, controls)
  services/          # API layer (fetch/create/update/delete)
  store/             # Zustand store and app actions
  utils/             # formatters and transaction helpers
  App.jsx            # shell, routing between tabs, orchestration
```

## Getting started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Scripts

```bash
npm run dev      # local development
npm run lint     # eslint checks
npm run build    # production build
npm run preview  # serve built output locally
```

## Configuration

Optional environment variable:

```bash
VITE_TRANSACTIONS_API_URL=https://your-api-endpoint.example.com/transactions
```

If not provided, the app uses the default mock API URL configured in the service layer.

## Behavior notes

- Preferences persisted in local storage: role, theme, active tab, and filters.
- Transaction records are loaded from API and normalized in the client.
- This is frontend-only role behavior (no server-side auth enforcement).

## Build mindset

Keep it simple, observable, and easy to extend.
Add new features only when they protect user outcomes or reduce operational confusion.
