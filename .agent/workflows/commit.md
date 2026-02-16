---
description: Create a conventional commit message, stage changes, commit, and push to origin
---

# Commit Workflow

## Steps

1. Run `git status` and `git diff --staged --stat` to understand what has changed. If nothing is staged, run `git add -A` to stage all changes (confirm with user first if there are unexpected files).

// turbo
2. Run `git diff --staged` to get the full diff of staged changes. If the diff is very large, use `git diff --staged --stat` and review key files individually.

3. Analyze the changes and craft a commit message following the **Conventional Commits** specification:

   ### Commit Message Format
   ```
   <type>(<optional scope>): <short summary>

   <optional body>

   <optional footer>
   ```

   ### Type (required)
   Choose the most appropriate type:
   - `feat` — A new feature or capability
   - `fix` — A bug fix
   - `refactor` — Code change that neither fixes a bug nor adds a feature
   - `docs` — Documentation-only changes
   - `style` — Formatting, whitespace, semicolons (no logic change)
   - `test` — Adding or updating tests
   - `chore` — Build process, dependencies, tooling, CI/CD
   - `perf` — Performance improvement
   - `ci` — CI/CD pipeline changes
   - `build` — Build system or dependency changes
   - `revert` — Reverts a previous commit

   ### Scope (optional)
   A noun describing the section of the codebase, e.g. `auth`, `api`, `ui`, `db`, `config`.

   ### Summary (required)
   - Use imperative, present tense: "add" not "added" or "adds"
   - Do NOT capitalize the first letter
   - No period at the end
   - Max 50 characters for the summary line

   ### Body (optional, recommended for non-trivial changes)
   - Separate from summary with a blank line
   - Use imperative, present tense
   - Explain WHAT and WHY, not HOW
   - Wrap at 72 characters
   - Use bullet points (`-`) for multiple items

   ### Footer (optional)
   - `BREAKING CHANGE: <description>` for breaking changes
   - `Closes #<issue>` or `Fixes #<issue>` for issue references

   ### Examples
   ```
   feat(auth): add JWT refresh token rotation
   ```
   ```
   fix(api): prevent duplicate expense entries on rapid submit

   Add debounce guard to the create-expense endpoint to reject
   duplicate submissions within a 2-second window.

   Fixes #42
   ```
   ```
   chore: update dependencies to latest compatible versions

   - Bump expo-constants from 17.x to 18.x
   - Bump eslint-config-expo from 9.x to 10.x
   - Run npx expo install --fix for SDK 54 compatibility
   ```

4. Present the proposed commit message to the user for approval before committing.

5. Once approved, run `git commit -m "<message>"` with the crafted message.

// turbo
6. Run `git push origin HEAD` to push to the remote.

// turbo
7. Run `git log --oneline -1` to confirm the commit was pushed successfully.
