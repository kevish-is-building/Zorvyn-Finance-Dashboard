# Finance Dashboard UI

A simple finance dashboard built with React and JavaScript using mock data.

## What this includes

- Dashboard overview with:
  - Total Balance
  - Income
  - Expenses
- Time-based visualization:
  - Balance trend chart
- Categorical visualization:
  - Spending breakdown by category
- Transactions section with:
  - Search
  - Type filter
  - Category filter
  - Sorting
- Basic role-based UI simulation:
  - Viewer can only view data
  - Admin can add transactions
- Insights section with:
  - Highest spending category
  - Monthly comparison
  - Expense ratio insight
- Responsive layout for desktop, tablet, and mobile
- Empty state handling
- Optional extras included:
  - Dark mode
  - Local storage persistence for role, theme, and transactions

## Tech stack

- React
- JavaScript
- Vite
- Plain CSS

## Approach

The goal was to keep the code easy to understand and maintain.

### Key decisions

- Used basic React concepts only:
  - `useState` for local UI state
  - `useEffect` for persistence and theme updates
  - `useMemo` for derived values like totals, filtered transactions, breakdowns, and insights
- Kept everything simple and readable instead of over-engineering the structure
- Used mock static data as requested
- Built lightweight charts using plain HTML/CSS/SVG so there is no chart library dependency
- Simulated role-based behavior entirely on the frontend

## Project structure

```bash
src/
  App.jsx
  App.css
  index.css
  main.jsx
```

## How to run

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- Transactions added in Admin mode are saved in local storage.
- Role and theme are also persisted in local storage.
- Since this is a frontend-only assignment, there is no backend or real authentication.

## Possible improvements if extended further

- Edit and delete transaction actions for admin
- CSV/JSON export
- Better date-range filtering
- More chart types
- Mock API layer with loading/error states
- Splitting into more components if the app grows larger
