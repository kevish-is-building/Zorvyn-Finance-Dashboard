# Technical Decisions and Trade-offs

- Framework: React 19 + Vite 8. Chosen for fast dev startup, hot reload speed, and simple component-based UI development. Trade-off: no built-in SSR, so rendering is fully client-side.
- Styling: Tailwind CSS 4 with custom CSS variables in src/index.css. Chosen for rapid UI iteration plus centralized theme tokens. Trade-off: utility-heavy JSX can become verbose.
- State management: Zustand with persist middleware in src/store/useFinanceStore.js. Chosen for lightweight global state and easy localStorage persistence. Trade-off: less enforced structure than larger state frameworks.
- Data layer: Dedicated service module in src/services/mockTransactionsApi.js. Chosen to separate API calls and mapping logic from UI components. Trade-off: custom fetch flow does not include advanced caching/retry features by default.
- Data processing: Client-side filtering, sorting, totals, and insights in src/utils/transactions.js. Chosen for instant feedback and simpler backend requirements. Trade-off: large datasets may eventually require server-side aggregation.
- Charts: Chart.js with react-chartjs-2. Chosen for mature chart capabilities and React integration. Trade-off: larger bundle compared to minimal chart libraries.
- Motion: Framer Motion with reduced-motion handling in src/App.jsx and section components. Chosen for smoother transitions and better perceived UX quality. Trade-off: adds dependency and runtime overhead.
- Architecture: Feature-oriented component split under src/components. Chosen for maintainability and clearer boundaries by section (overview, controls, transactions). Trade-off: more prop wiring and coordination across files.
- Role behavior: Frontend viewer/admin mode with UI gating of create/edit/delete actions. Chosen to demonstrate role-aware UX quickly. Trade-off: this is not backend security and must be enforced server-side in production.
- UX feedback states: Explicit loading, saving, and error/retry messages in transactional flows. Chosen to improve user trust and observability. Trade-off: slightly more UI/state complexity to manage.
