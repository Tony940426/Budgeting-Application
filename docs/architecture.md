# Architecture

High-level system architecture, data flow, and component relationships for the budgeting application.

## System Overview

V1/MVP is a single-page Angular application with a thin .NET Web API alongside it. All budgeting calculations run in the browser; the backend exists so V2 (auth, persistence, Excel export) doesn't start from zero.

```
┌──────────────────────────────────┐        ┌─────────────────────────────┐
│  Angular client (/client)        │        │  .NET Web API (/server)     │
│                                  │        │                             │
│  ┌────────────────────────────┐  │        │  ┌───────────────────────┐  │
│  │  Budget page (route '/')   │  │        │  │  HealthController     │  │
│  │  - StrategyExplanation     │  │  CORS  │  │   GET /api/health     │  │
│  │  - BudgetInput (form)      │  ├────────┤  └───────────────────────┘  │
│  │  - BudgetChart (donut)     │  │        │                             │
│  │  - AllocationList (edit)   │  │        │   (V2: auth, persistence,   │
│  │  - Remaining (status)      │  │        │    budgets API, export)     │
│  └────────────────────────────┘  │        │                             │
│             │                    │        └─────────────────────────────┘
│             ▼                    │
│  ┌────────────────────────────┐  │
│  │  BudgetService             │  │
│  │  (RxJS BehaviorSubjects:   │  │
│  │   income, strategyId,      │  │
│  │   amendments → budget$)    │  │
│  └────────────────────────────┘  │
│             │                    │
│             ▼                    │
│  ┌────────────────────────────┐  │
│  │  StrategyRegistry          │  │
│  │   ├ FiftyThirtyTwenty      │  │
│  │   └ (V1.5: more...)        │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

## Components

**Angular client (`/client/src/app`)**
- `core/models/` — Pure types: `PayCycle`, `IncomeInput`, `Allocation`, `Budget`.
- `core/strategies/budgeting-strategy.ts` — `BudgetingStrategy` interface (`id`, `name`, `description`, `calculate(income)`).
- `core/strategies/fifty-thirty-twenty.strategy.ts` — V1's only strategy.
- `core/strategies/strategy-registry.ts` — `Injectable` registry; `get(id)` and `list()` for UI.
- `core/budget.service.ts` — Reactive state hub; the only source of truth for income, selected strategy, and amendments. Exposes `budget$` (derived).
- `features/budget/` — UI components (page + cards). All standalone, all use `OnPush` change detection.

**.NET server (`/server/Budgeting.Api`)**
- `Program.cs` — Minimal hosting setup, OpenAPI in dev, CORS for `http://localhost:4200`.
- `Controllers/HealthController.cs` — Returns 200 from `GET /api/health`.

## Data Flow

V1 has no network calls between client and server (other than the health check). The full flow is in-browser:

1. User enters income + selects pay cycle in `BudgetInputComponent`.
2. The form pushes `IncomeInput` into `BudgetService.setIncome`.
3. `BudgetService.budget$` emits a fresh `Budget`:
   - Active strategy's `calculate(income)` produces base allocations.
   - Any amendments override allocation amounts by category.
   - `remaining = income.amount - sum(allocation amounts)`.
4. `AllocationListComponent`, `BudgetChartComponent`, and `RemainingComponent` re-render off the new `budget$` value.
5. Editing an allocation calls `BudgetService.amend(category, amount)` → step 3 repeats.
6. "Reset to strategy default" clears amendments → step 3 repeats.

## Component Relationships

- All UI components depend on **`BudgetService`** for state (read via `toSignal(budget$)`); they do **not** know about strategies directly.
- `BudgetService` depends on **`StrategyRegistry`** to look up the active strategy by id.
- Strategies depend only on the domain types in `core/models/` — they have no Angular or RxJS coupling, which keeps them trivial to unit-test.
- New strategies are added by implementing `BudgetingStrategy` and registering with `StrategyRegistry`; no UI or service changes required.

## Data Model

In-memory only in V1. See `project_spec.md` for the canonical type definitions:
- `PayCycle`, `IncomeInput`, `Allocation`, `Budget`, `BudgetingStrategy`.

V2 will introduce a persisted shape (likely a `Budget` row owned by a `User`, with allocations and amendments stored as related records).

## External Dependencies

- **Angular Material** — UI components and Material 3 theming.
- **ng2-charts** + **chart.js** — donut chart visualisation.
- **RxJS** — reactive state in `BudgetService`.
- **xUnit** + **Microsoft.AspNetCore.Mvc.Testing** — server smoke tests via `WebApplicationFactory<Program>`.

V2+ will likely add: auth library (TBD), database/ORM (likely EF Core), Excel export library, AI/document services.

## Conventions

- Standalone Angular components (no `NgModule`s).
- `OnPush` change detection across the app.
- Strategy implementations are pure classes — no Angular DI, no side effects in `calculate`.
- Currency rounding: 2 decimal places via `Math.round(n * 100) / 100`.
