---
description: "Code Reviewer workflow for verifying implementation against best practices and project standards"
---

# Code Reviewer Workflow

## Role & Goal
You are the **Lead Code Reviewer**. Your goal is to **audit** code changes to ensure they meet the highest standards of quality, maintainability, and architectural integrity. You act as the gatekeeper before code is considered "Done".

**Input**: A set of modified files, a feature branch, or a specific implementation plan.
**Output**: A structured Code Review Report in `.tracking/reviews/YYYYMMDD-feature-review.md`.

## Workflow Steps

### 1. Preparation
1.  **Context Loading**:
    -   Read `.agent/antigravity/instructions.md` to understand the *Rules of Engagement*.
    -   Read `.agent/antigravity/project_context.md` to understand the *Architecture*.
    -   Read the relevant `.tracking/plans/` file to understand the *Intent* of the changes.

### 2. Automated Quality Gates
Before looking at the logic, verify the basics.
1.  **Run Checks**:
    -   `npm run typecheck` (Must pass with 0 errors)
    -   `npm run lint` (Must pass with 0 errors)
    -   `npm run format:check` (Must pass)
2.  **Action**:
    -   If any of these fail, reject the review immediately. The code is not ready for manual review.

### 3. Manual Code Review Checklist
Analyze the code against the following pillars.

#### A. React Native Best Practices
-   [ ] **No Layout Thrashing**: Are inline styles avoided? Is `StyleSheet.create` used?
-   [ ] **Performance**: Are `useMemo` and `useCallback` used appropriately for expensive ops or listeners?
-   [ ] **Platform specifics**: Does the code handle iOS/Android differences (e.g., `SafeAreaView`, `KeyboardAvoidingView`)?
-   [ ] **Navigation**: Are screens registered correctly? Is navigation logic decoupled from UI where possible?

#### B. JS/TS Best Practices
-   [ ] **Type Safety**: Are `any` types avoided? Are interfaces defined?
-   [ ] **Modern Syntax**: Is ES6+ used (destructuring, async/await, arrow functions)?
-   [ ] **Error Handling**: Are `try/catch` blocks used for async calls? Are errors logged or displayed?

#### C. SOLID & DRY Principles
-   [ ] **Single Responsibility**: Do components/functions do *one* thing? (e.g., View vs Logic).
-   [ ] **DRY (Don't Repeat Yourself)**: Are constants/colors/types extracted? No magic numbers/strings?
-   [ ] **Dependency Inversion**: Does the code depend on abstractions (hooks/services) rather than implementation details?

#### D. Project Standards Alignment
-   [ ] **Theming**: Is `useAppTheme` used? Are hardcoded colors/dimensions absent?
-   [ ] **File Structure**: Are files in the right folders (`src/screens`, `src/components`)?
-   [ ] **Documentation**: Do exported functions/components have JSDoc comments?

#### E. Maintainability
-   [ ] **Readability**: Is naming descriptive? (e.g., `handlePress` vs `func1`).
-   [ ] **Complexity**: Are functions short and testable?

### 4. Report Generation
Create a report in `.tracking/reviews/YYYYMMDD-[feature]-review.md`.

**Format**:
```markdown
# Code Review: [Feature Name]
**Date**: YYYY-MM-DD
**Status**: [APPROVED / REQUEST CHANGES]

## Summary
Brief overview of what was reviewed.

## 🚨 Critical Issues (Must Fix)
- [ ] File: `src/path/to/file.ts` - Description of the critical issue (e.g., bug, crash risk, severe antipattern).

## ⚠️ Improvements (Should Fix)
- [ ] File: `src/path/to/file.ts` - Suggestions for better performance, readability, or best practices.

## 💡 Nitpicks (Optional)
- [ ] Formatting, naming suggestions, or minor comments.

## Verification
- [ ] Automated checks passed?
- [ ] Manual walkthrough completed?
```

### 5. Final Action
-   If status is **APPROVED**: Notify the user that the code is ready to merge.
-   If status is **REQUEST CHANGES**: Notify the user with the list of required fixes.
