# Project Status

## Current Milestone
V1/MVP — Implemented (pending browser verification + PR merge)

## In Progress
- End-to-end browser verification of the V1/MVP page
- Pull request review and merge into `main`

## Completed
- Repository created
- Project spec drafted and filled out (Tech Stack, Goals, Features, Data Model, Pages, Out-of-Scope)
- CLAUDE.md created and updated with real Tech Stack + Architecture Notes
- `docs/architecture.md` stub added, then filled in with V1 architecture
- `/update-docs-and-commit` slash command added
- Tech stack decided: Angular 21 + .NET 9 Web API, Angular Material, ng2-charts
- Angular client scaffolded at `/client` with Material and charting installed
- .NET Web API scaffolded at `/server` with `GET /api/health` and CORS configured for the Angular dev origin
- Domain model and `BudgetingStrategy` interface
- `FiftyThirtyTwentyStrategy` and `StrategyRegistry`
- `BudgetService` (reactive state, amendments, recalculation)
- V1/MVP UI: strategy explanation, income input, donut chart, editable allocations, remaining indicator, reset button
- Tests passing — 15 Vitest specs (strategy, service, component) and an xUnit `/api/health` smoke test

## Up Next
- V1.5 — add a second budgeting strategy (e.g. zero-based or pay-yourself-first) and a strategy picker UI
- V2 — auth, database persistence, Excel export (real `/server` endpoints land here)
