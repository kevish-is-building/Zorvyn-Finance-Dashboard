# Additional Notes

- Submission focus: Deliver a clean, production-minded frontend dashboard with clear data visibility, role-aware interactions, and reliable feedback states.
- Scope decision: Prioritized core workflows (overview, filtering, CRUD in admin mode, export, theming, responsiveness) over adding many secondary features.
- Known limitation: Role switching is frontend-only and intended for UX demonstration; real authorization must be enforced by backend APIs.
- Known limitation: Data querying is mostly client-side, which is fast for small to medium datasets but may not scale well for very large records.
- Known limitation: API integration uses a mock endpoint pattern and minimal fetch handling, so advanced caching/offline behavior is not included.
- API endpoints available in the mock service: GET /Transactions
- API endpoints available in the mock service: GET /Transactions/:id
- API endpoints available in the mock service: POST /Transactions
- API endpoints available in the mock service: PUT /Transactions/:id
- API endpoints available in the mock service: DELETE /Transactions/:id
- Area for improvement: Add server-side pagination, filtering, and aggregation to improve performance at scale.
- Area for improvement: Introduce stronger data-fetching patterns (retry policies, stale-while-revalidate, optimistic updates).
- Area for improvement: Expand automated test coverage for state actions, utilities, and key UI flows.
- Area for improvement: Add backend-backed auth and role enforcement to align UI permissions with security.
- Approach context: The implementation intentionally balances speed, readability, and extensibility so future enhancements can be added incrementally.
