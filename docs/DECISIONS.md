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

## 2026-10-07 — Production AI limits
- Added shared Upstash counters: 3 requests per minute and 30 attempts per UTC day across the demo.
- Production AI pauses if the counter cannot be verified.
- Counters store no candidate responses or identities.
- Local production build passed.
- Next step: verify real AI and error handling at the public URL.
- Tomorrow's first move: finish mechanical tests and the persona walkthrough.

## 2026-10-07 — Counter connection diagnosis
- Public AI test remained paused after updating the Upstash token.
- Added diagnostic codes without logging secrets or candidate responses.
- Local build passed; root cause is still unconfirmed.
- Next move: inspect production logs, fix the cause, and retest.

## 2026-10-07 — Production fix and verification
- Production logs showed LIMIT_HTTP_STATUS 403.
- The Upstash token was read-only. Replaced it with a writable token in Vercel and redeployed.
- Public AI review succeeded after redeployment.
- Selecting 2 in all five human criteria produced 10/10 and a provisional next-stage recommendation.
- Requesting reconsideration suspended the recommendation and disabled the controls.
- Reconsideration was tested in an incognito browser.
- The reconsideration is a screen simulation; it is not sent to a person.
- Next move: run the persona test in a fresh chat and fix the main confusion.

## 2026-10-07 — Persona test corrections
- Synthetic persona Sofía found an outdated notice saying AI was not connected.
- Updated the notice to describe the working demo.
- Clarified that the visitor represents the human evaluator and manually selects demo scores.
- Clarified that oral explanation stays pending without a simulated interview.
- Production build passed.
- The 23/27 discrepancy remains unconfirmed because the matching completed form was not shown.
- Next move: verify the deployed text and repeat the affected persona screens.
