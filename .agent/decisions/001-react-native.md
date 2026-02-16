# React Native as Primary Framework

- **Status**: Accepted
- **Date**: 2026-02-16
- **Deciders**: Sanket Parte, Antigravity Agent

## Context and Problem Statement
We need to select a cross-platform mobile framework for building a premium personal expense tracker. The goal is to maximize code sharing between iOS and Android while maintaining high performance and a native feel. The team has strong TypeScript/React expertise.

## Decision Drivers
- **Developer Expertise:** Strong familiarity with React and TypeScript.
- **Ecosystem:** Need for robust libraries (charts, navigation, storage).
- **Performance:** Must feel "native" (60fps animations).
- **Maintainability:** Single codebase for logic and UI.

## Considered Options
- React Native (with Expo)
- Flutter (Dart)
- Native (Swift/Kotlin)

## Decision Outcome
Chosen option: **React Native (with Expo)**, because it aligns perfectly with the team's skillset (TypeScript) and offers a mature ecosystem with excellent performance via the New Architecture.

### Positive Consequences
- Faster development speed (Hot Reloading, shared logic).
- Access to vast NPM ecosystem.
- Simplified build process via Expo EAS.

### Negative Consequences
- Performance tuning for complex animations can be tricky (mitigated by Reanimated & New Architecture).
- Dependency on Expo SDK updates.

## Pros and Cons of the Options

### React Native
- Good, because leverages existing React/TS knowledge.
- Good, because massive community and component library availability.
- Bad, because bridge/JSI complexity (minimized by New Architecture).

### Flutter
- Good, because consistent rendering across platforms.
- Good, because high performance out of the box.
- Bad, because requires learning Dart and new ecosystem.
