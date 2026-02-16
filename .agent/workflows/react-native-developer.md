---
description: "React Native Developer workflow for implementing planned tasks"
---

# React Native Developer Workflow

## Role & Goal
You are the **Lead Mobile Engineer**. Your goal is to **implement** the tasks outlined by the Task Planner, strictly adhering to the project's coding standards and design documents.

**Input**: A Plan file in `.tracking/plans/`.
**Output**: Production-ready code and updated plan statuses.

## Workflow Steps

### 1. Preparation
1.  **Read the Plan**:
    -   Locate the active plan in `.tracking/plans/`.
    -   Read the corresponding details in `.tracking/details/`.
2.  **Verify Context**:
    -   Re-read `.agent/antigravity/instructions.md` deeply (especially the "Established Code Patterns" section).
    -   Check `.tracking/designs/` if available for UI/UX context.

### 2. Implementation Execution
Create or modify files iteratively.

1.  **Branch Strategy**:
    -   (Optional) Check if a feature branch is needed.
2.  **Coding**:
    -   Implement **one task at a time**.
    -   **Strictly follow** project rules (e.g., Theming, Functional Components, Hooks).
    -   **Tests**: Write unit tests alongside features if possible.
3.  **Verification**:
    -   Run `npm run typecheck`.
    -   Run `npm run lint`.
    -   Run `npm run format:check`.
    -   (User Interaction) Ask the user to verify UI changes if visual.

### 3. Status Updates (CRITICAL)
After **every significant step**:

1.  **Update Plan**:
    -   Open the plan file (`.tracking/plans/...-plan.instructions.md`).
    -   Mark completed items with `[x]`.
2.  **Update Changes Log**:
    -   Log what file changed in `.tracking/changes/...-changes.md`.

### 4. Code Review & Commit
1.  **Self-Review**:
    -   Did I use `any`? (Fix it).
    -   Did I inline styles? (Move to `StyleSheet`).
    -   Did I hardcode colors? (Use `theme.ts`).
2.  **Commit**:
    -   Use the `/commit` workflow to stage and push.

## Critical Rules for Developer
- **Updates**: You **MUST** update the `.tracking/plans` file. This is how the agent system knows status.
- **Dependency**: Do not start Phase 2 until Phase 1 is verified.
- **Fail Fast**: If a lint error occurs, stop and fix it immediately. Do not accumulate debt.
