---
description: Sync docs (changelog, architecture, project status) with current changes, then commit
---

Update the project's documentation to reflect the current pending changes, then create a commit. Follow these steps in order:

## 1. Analyse git changes

Run `git status` and `git diff` (including staged changes) to understand what has actually changed. Base every doc update on this evidence — do not invent changes that aren't in the diff.

If there are no changes at all, stop and tell the user there is nothing to commit.

## 2. Update `docs/changelog.md`

- Add entries under the `## [Unreleased]` section for any new features, fixes, or notable changes visible in the diff.
- Group entries by type if helpful (Added / Changed / Fixed / Removed).
- One entry per logical change — do not list every file touched.
- If `[Unreleased]` does not exist, create it at the top.

## 3. Update `docs/architecture.md` — only if structural changes occurred

Only touch this file if the diff includes structural changes such as:
- New components, modules, or services
- Changes to how components interact or to data flow
- New external dependencies or integrations
- Changes to the data model that affect architecture

If the changes are purely cosmetic, doc-only, or contained within an existing component's internals, leave `architecture.md` alone.

## 4. Update `docs/project_status.md`

- Move items from "In Progress" to "Completed" if the diff shows them finished.
- Add new "In Progress" items if the diff shows work that has started but isn't done.
- Update the "Current Milestone" line if a milestone has been reached.
- Refresh "Up Next" if priorities have shifted based on what just landed.

## 5. Stage and commit

- Stage the original changes plus any doc updates you just made. Add files by name — do not use `git add -A` or `git add .` (avoids accidentally committing `.env`, `.vs/`, or other untracked artefacts).
- Write a commit message that focuses on the *why* of the change, not a file-by-file list. 1–2 sentences is plenty.
- Follow the repo's commit-message style (check recent `git log` output).
- Never use `--no-verify`, `--amend`, or force-push. Create a new commit.
- Never commit `.env` or other likely-secret files. If they appear in `git status`, warn the user and skip them.

## 6. Report

After committing, run `git status` to confirm a clean tree, then summarise in 1–2 sentences: what was committed and which docs were updated (or explicitly note that architecture.md was left alone because no structural change occurred).
