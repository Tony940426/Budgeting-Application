# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

A web-based personal budgeting application for people new to the workforce. Users enter their income and the app calculates a budget breakdown per pay cycle (fortnightly/monthly) using established budgeting strategies (starting with 50/30/20), with clear visualisations and the ability to amend allocations.

## Milestones

- **V1/MVP** — 50/30/20 strategy calculator with visualisations and amendments
- **V1.5** — Additional budgeting strategies (user can choose)
- **V2** — Excel export, user login, database-backed persistence
- **V3** — AI-powered bank statement scanning to auto-generate budgets (with secure document handling)

## Pull Request Rules

- Always create a pull request to merge into `main` — never merge directly
- Never force push to `main`
- Keep commits focused on a single change

## Branching Strategy

- Never commit directly to `main`
- Always create a branch before starting new features or fixes
- Branch naming: `feature/description` or `fix/description`

## Tech Stack

> To be confirmed. Update this section once the stack is decided.

## Architecture Notes

> To be filled in as the codebase grows. Key areas to document here: how budgeting strategies are structured (so new ones can be added consistently), how state is managed, and (from V2) how auth and data persistence work.

## Key Domain Concepts

- **Pay cycle** — fortnightly or monthly; all budget calculations are relative to this period
- **Budgeting strategy** — a rule set for allocating income (e.g. 50/30/20 splits income into needs/wants/savings). New strategies should follow the same interface/pattern as existing ones.
- **Amendments** — user overrides to the generated allocation; the app should re-calculate remaining funds when an amendment is made
