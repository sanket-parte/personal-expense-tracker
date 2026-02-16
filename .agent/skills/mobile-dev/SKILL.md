---
name: mobile-dev
description: Comprehensive guide for React Native mobile application development using Expo.
---

# React Native Mobile Development Skill

## Overview
This skill outlines the best practices, tools, and patterns for building the Personal Finance App using React Native.

## Tech Stack
- **Framework**: React Native (via Expo)
- **Navigation**: React Navigation (Native Stack) or Expo Router (File-based)
- **State Management**: Zustand (Simple, scalable) or React Context.
- **Styling**: `StyleSheet` or `NativeWind` (Tailwind CSS for React Native).
- **Storage**: `AsyncStorage` (or `MMKV` for performance).
- **Icons**: `expo-vector-icons` (e.g., Ionicons, MaterialIcons).

## Project Structure
```
/app              # Expo Router (if using) or /src
  /components     # Reusable UI components
    /ui           # Primitive components (Button, Card, Input)
    /forms        # Form-specific components
  /screens        # Screen components (if not using file-based routing)
  /hooks          # Custom React hooks
  /services       # API services, storage logic
  /utils          # Helper functions, formatters
  /constants      # Theme colors, config values
  /assets         # Images, fonts
```

## Component Development
- **Functional Components**: Use functional components with hooks.
- **TypeScript**: Use TypeScript for type safety (Interfaces for Props, State).
- **Prop Logic**: Destructure props in the function signature.
- **Micro-Components**: Break down complex UIs into smaller, focused components.

## Styling Guidelines
- Use a central `theme` object for colors, spacing, and typography.
- Avoid hardcoded values; use constants.
- Support Dark Mode from the start using `useColorScheme`.
- Focus on "Premium" aesthetics: smooth transitions, consistent spacing, high-quality typography.

## Performance
- Use `FlashList` (Shopify) or optimized `FlatList` for long lists.
- Optimize images (use appropriate formats/sizes).
- Memoize expensive calculations (`useMemo`) and callbacks (`useCallback`).
- Avoid anonymous functions in `renderItem` props.

## Testing
- Unit testing with Jest and React Native Testing Library.
- Snapshot testing for critical UI components.
