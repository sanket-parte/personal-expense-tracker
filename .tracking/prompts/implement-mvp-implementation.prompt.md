---
mode: agent
model: Antigravity
---

<!-- markdownlint-disable-file -->

# Implementation Prompt: MVP Implementation

## Implementation Instructions

### Step 1: Create Changes Tracking File

You WILL create `20260217-mvp-implementation-changes.md` in .tracking/changes/ if it does not exist.

### Step 2: Execute Implementation

You WILL follow .agent/antigravity/instructions.md
You WILL systematically implement .tracking/plans/20260217-mvp-implementation-plan.instructions.md task-by-task
You WILL follow ALL project standards and conventions

**CRITICAL**: Ask the user for confirmation after each Phase.
**CRITICAL**: Ask the user for confirmation after each Task if requested.

### Step 3: Cleanup

When ALL Phases are checked off (`[x]`) and completed you WILL do the following:

1. You WILL provide a markdown style link and a summary of all changes from .tracking/changes/20260217-mvp-implementation-changes.md to the user:

   - You WILL keep the overall summary brief
   - You WILL add spacing around any lists
   - You MUST wrap any reference to a file in a markdown style link

2. You WILL provide markdown style links to .tracking/plans/20260217-mvp-implementation-plan.instructions.md, .tracking/details/20260217-mvp-implementation-details.md, and .tracking/research/20260217-mvp-implementation-research.md documents. You WILL recommend cleaning these files up as well.
3. **MANDATORY**: You WILL attempt to delete .tracking/prompts/implement-mvp-implementation.prompt.md

## Success Criteria

- [ ] Changes tracking file created
- [ ] All plan items implemented with working code
- [ ] All detailed specifications satisfied
- [ ] Project conventions followed
- [ ] Changes file updated continuously
