# Budgeting Application — Project Spec

## Overview
A web-based personal budgeting application aimed at people who are new to the workforce and want to learn how to manage their finances. Users input their income and the app breaks down how to allocate funds across a pay cycle using established budgeting strategies, with clear visualisations and the ability to make adjustments. Starting as a web app with potential expansion to mobile in the future.

## Milestones
- **V1/MVP** — Implement the 50/30/20 budgeting strategy. Simple calculator: user inputs income, app generates a budget breakdown for the pay cycle with clear visualisations and the ability to make amendments. Each strategy should have a clear, simple explanation.
- **V1.5** — Implement additional budgeting strategies for the user to choose from.
- **V2** — Export budget to Excel. Login system to store users and their inputs, connected to a database.
- **V3** — AI functionality: user uploads a monthly bank statement, app scans and extracts regular payments and income to auto-generate a budget. Requires proper security and disposal of financial documents.

## Goals
- Help people new to the workforce learn how to allocate their pay across needs, wants, and savings without needing finance knowledge upfront.
- Make the budget breakdown immediately visible and intuitive — clear numbers and a chart, not a spreadsheet.
- Let users tailor the suggested split to their real life via amendments and see the impact on what's left over straight away.
- Keep the codebase set up so additional strategies (V1.5) and persistence (V2) can be added without rework.

## Tech Stack
- **Frontend**: Angular 21 (standalone components, signals, Reactive Forms) with TypeScript and SCSS
- **UI components**: Angular Material (Material 3 theming)
- **Charts**: ng2-charts (Chart.js wrapper) for the allocation donut
- **Backend**: ASP.NET Core Web API (.NET 9) — scaffolded for V1, real endpoints land from V2
- **Repository layout**: `/client` (Angular workspace) and `/server` (.NET solution) side-by-side
- **Tests**: Vitest + Angular TestBed on the client; xUnit + `WebApplicationFactory` on the server

## Features
### V1/MVP
- Enter income amount and select pay cycle (fortnightly or monthly)
- Automatic 50/30/20 split into Needs / Wants / Savings with per-category amount
- Strategy explanation displayed alongside the breakdown
- Donut chart visualisation of the allocation
- Editable allocation amounts (amendments) with live recalculation of remaining funds
- Colour-coded "remaining" indicator (balanced / underspent / overspent)
- "Reset to strategy default" to clear all amendments

### V1.5+ (not in V1)
- Additional strategies (e.g. zero-based budgeting, pay-yourself-first) via the existing `BudgetingStrategy` interface
- Strategy picker UI

## Data Model
Client-side only in V1 (no persistence). Persistence and richer schema land in V2.

- **PayCycle**: `'fortnightly' | 'monthly'`
- **IncomeInput**: `{ amount: number, payCycle: PayCycle }`
- **Allocation**: `{ category: string, percentage: number, amount: number, description?: string }`
- **Budget**: `{ strategyId: string, income: IncomeInput, baseAllocations: Allocation[], allocations: Allocation[], remaining: number }`
- **BudgetingStrategy**: `{ id, name, description, calculate(income): Allocation[] }` — all strategies (current and future) implement this interface and register with `StrategyRegistry`.

## Pages / Screens
- **Budget page** (`/`) — single page composed of:
  - Strategy explanation card (header)
  - Income input card (income amount + pay cycle radio)
  - Breakdown chart card (donut)
  - Allocations card (editable amount per category, remaining indicator, reset button) — appears once income is entered

V1 is single-page. Routing is in place for additional pages later.

## Out of Scope
- Authentication, user accounts, multi-device sync (V2)
- Database / persistent storage of budgets (V2)
- Excel export (V2)
- Bank-statement upload, OCR, and AI categorisation (V3)
- Multiple simultaneous strategies / strategy comparison (post-V1.5)
- Mobile-native apps (potential later)
- Currency selection / multi-currency support
- Tax calculations and net-vs-gross handling — income is taken at face value
- Production deployment, hosting, CI/CD pipelines
