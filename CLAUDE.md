# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

A web-based personal budgeting application for people new to the workforce. Users enter their income and the app calculates a budget breakdown per pay cycle (fortnightly/monthly) using established budgeting strategies (starting with 50/30/20), with clear visualisations and the ability to amend allocations.

## Milestones

- **V1/MVP** — 50/30/20 strategy calculator with visualisations and amendments
- **V1.5** — Additional budgeting strategies (user can choose)
- **V2** — Excel export, user login, database-backed persistence
- **V3** — AI-powered bank statement scanning to auto-generate budgets (with secure document handling)

## Documentation

- **Project spec** — `project_spec.md` (goals, features, tech stack, data model)
- **Changelog** — `docs/changelog.md` (record of major changes and releases)
- **Project status** — `docs/project_status.md` (current progress, what's in flight, what's next)
- **Architecture** — `docs/architecture.md` (high-level system architecture, data flow, and component relationships)

Update `docs/changelog.md` and `docs/project_status.md` after major milestones and major feature additions.

When making git commits, use the `/update-docs-and-commit` slash command to ensure docs are kept in sync.

## Pull Request Rules

- Always create a pull request to merge into `main` — never merge directly
- Never force push to `main`
- Keep commits focused on a single change

## Branching Strategy

- Never commit directly to `main`
- Always create a branch before starting new features or fixes
- Branch naming: `feature/description` or `fix/description`

## Tech Stack

- **Frontend** (`/client`) — Angular 21 (standalone components, signals, Reactive Forms), TypeScript, SCSS, Angular Material, ng2-charts (Chart.js)
- **Backend** (`/server`) — ASP.NET Core Web API on .NET 9. Scaffolded for V1 with a `/api/health` endpoint; real endpoints land from V2 (auth, persistence)
- **Tests** — Vitest + Angular TestBed (client); xUnit + `WebApplicationFactory<Program>` (server)
- **Repo layout** — `/client` and `/server` are independent projects in the same repo

## Architecture Notes

- **Strategy pattern**: every budgeting strategy implements `BudgetingStrategy` (`client/src/app/core/strategies/budgeting-strategy.ts`) — `id`, `name`, `description`, `calculate(income)`. New strategies register with `StrategyRegistry` and become available without touching the calculation pipeline.
- **State**: `BudgetService` (`client/src/app/core/budget.service.ts`) holds reactive state in RxJS `BehaviorSubject`s (income, selected strategy, amendments) and exposes a derived `budget$` observable that recomputes on any change. Components subscribe via `toSignal` / `async` pipe.
- **Calculation lives client-side in V1**. The .NET backend exists for V2 (auth, persistence, Excel export) but currently only serves `/api/health`.
- **Amendments**: per-category overrides held in a `Map<category, amount>`. `remaining = income.amount - sum(allocation amounts)`. Resetting clears the map and falls back to the strategy's default split.
- **Persistence**: none in V1 (state lives in memory only). V2 will introduce auth + a database; the backend project is scaffolded for that.
- See `docs/architecture.md` for the full architecture overview.

## Key Domain Concepts

- **Pay cycle** — fortnightly or monthly; all budget calculations are relative to this period
- **Budgeting strategy** — a rule set for allocating income (e.g. 50/30/20 splits income into needs/wants/savings). New strategies should follow the same interface/pattern as existing ones.
- **Amendments** — user overrides to the generated allocation; the app should re-calculate remaining funds when an amendment is made
