# Architecture

High-level system architecture, data flow, and component relationships for the budgeting application.

## System Overview

> To be filled in once the tech stack is decided. Should describe the major layers (frontend, backend, storage) and how they fit together.

## Components

> List the major components/modules and what each is responsible for. Examples to cover as the codebase grows:
> - Budgeting strategy module (50/30/20, future strategies)
> - Income/pay cycle handling
> - Allocation amendments
> - Visualisation layer
> - (V2+) Auth, persistence, export
> - (V3) Bank statement ingestion / AI processing

## Data Flow

> Describe how data moves through the system end-to-end. For V1/MVP, this is roughly:
> 1. User enters income + pay cycle
> 2. Selected strategy calculates allocations
> 3. Allocations are rendered as visualisations
> 4. User amendments feed back into recalculation

## Component Relationships

> Diagram or describe the dependencies between components. Note which components are intended to be swappable (e.g. budgeting strategies should follow a common interface so new ones can be added without touching the calculation pipeline).

## Data Model

> Reference or summarise the data shapes here. Detailed schema lives in `project_spec.md`.

## External Dependencies

> Third-party services, APIs, libraries that shape the architecture. Empty for V1/MVP; expected to grow with V2 (auth/database) and V3 (AI/document handling).
