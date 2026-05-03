# Changelog

All major changes and releases are recorded here.

## [Unreleased]
### Added
- **V1/MVP application bootstrap**:
  - Angular 21 client at `/client` (standalone components, signals, Reactive Forms, Material, ng2-charts)
  - ASP.NET Core Web API at `/server` (.NET 9) with `GET /api/health` and CORS for the Angular dev origin
- **Budgeting domain & strategy interface** (`client/src/app/core/`): `PayCycle`, `IncomeInput`, `Allocation`, `Budget` types; `BudgetingStrategy` interface; `FiftyThirtyTwentyStrategy`; `StrategyRegistry`
- **`BudgetService`** — reactive state for income, selected strategy, and amendments; derived `budget$` recomputes allocations and remaining funds
- **Budget page UI** with Material cards: strategy explanation, income input, donut chart, editable allocations, colour-coded remaining indicator, reset button
- `docs/architecture.md` filled in with the V1 architecture (was a stub)
- `/update-docs-and-commit` slash command (`.claude/commands/update-docs-and-commit.md`)
- Test setup: 15 Vitest specs (strategy, service, component) and an xUnit smoke test for `/api/health`
- `.gitignore` covers Angular and .NET artefacts

### Changed
- `project_spec.md` — Tech Stack, Goals, Features, Data Model, Pages, and Out-of-Scope sections filled in (were empty stubs)
- `CLAUDE.md` — Tech Stack and Architecture Notes sections filled in; Documentation section lists `docs/architecture.md`

### Fixed
- Stray "ok" inserted into the V1/MVP milestone description in `project_spec.md`

## [0.0.1]
- Project initialised
