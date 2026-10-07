# Decisions - packet session

Date: 2026-10-07

- User requested packet first, then step-by-step implementation in their terminal. No app code has been authored.
- Team Blueprint pending; this packet documents proposed conditions only.
- Fictional, browser-session-only demonstration; no CVs, personal identifiers or database.
- Planned Dragon Stack: live server-side LLM + structured fictional case with verified arithmetic + transparent human-rubric matching.
- No live call, tests, persona test, bug fix, commits or deployments are yet claimed.
- A Sites project was registered earlier but no code or deployment exists; do not substitute it for the user's terminal/Vercel workflow.
- Generated visual is a mockup, not application evidence.

Next session first move: choose the user's local project folder, copy docs, inspect git state and commit documentation before code.

Remaining: Blueprint reconciliation, USER research, budget authorization, API model/quota verification, measured economics.

## Build progress — 2026-10-07
- Added valuation input validation and formula-based comparison using the fictional case.
- Added a simulated human rubric; any pending criterion blocks a recommendation.
- A reconsideration request suspends the recommendation in the demo.
- Observed confusion: the disabled reconsideration button looked unresponsive. Updated its label to confirm the request.
- Lint and production build passed after the update.
- The LLM connection, deployment and persona test remain pending.
- Next move: implement the server-side LLM review with validated inputs and protected credentials.

## 2026-10-07 — Real Gemini integration
- Connected gemini-3.1-flash-lite through a server-side POST route.
- Validated request size, numeric ranges, explanation length and structured AI output.
- Confirmed a real AI review in the local interface.
- Error-case test: entered equityLow = 22; Gemini identified the difference from the reference value of 31.
- Human scores remain separate from the AI draft.
- Production AI remains disabled until shared usage limits are configured.
- Next step: configure production protection, publish and test the public URL.
