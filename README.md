# Personal Expense Tracker

A premium, AI-powered personal finance mobile app built with React Native and Expo. Track expenses, manage budgets, and gain actionable financial insights — all with a beautiful, native-feeling UI.

## ✨ Features (MVP Roadmap)

- 📊 **Expense Tracking** — Manual entry with category tagging
- 💰 **Budget Management** — Monthly limits per category with visual progress
- 📈 **Analytics** — Spending breakdowns with charts
- 🌙 **Dark Mode** — System-automatic light/dark theme
- 🔒 **Privacy First** — Local-first data storage, encrypted at rest

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo SDK 54, New Architecture) |
| Language | TypeScript (strict mode) |
| Styling | StyleSheet + centralized theme tokens |
| Linting | ESLint v9 flat config + Prettier |
| Platform | iOS & Android |

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npx expo`)
- iOS Simulator (macOS) or Android Emulator, or [Expo Go](https://expo.dev/go) on a physical device

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/sanket-parte/personal-expense-tracker.git
cd personal-expense-tracker

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go, or press `i` for iOS Simulator / `a` for Android Emulator.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm run ios` | Start on iOS Simulator |
| `npm run android` | Start on Android Emulator |
| `npm run lint` | Run ESLint on `src/` |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without modifying |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run Jest test suite |

## 📂 Project Structure

```
src/
  App.tsx               # Root component
  components/
    ui/                 # Reusable primitives (Button, Card, Input)
    forms/              # Form-specific components
  screens/              # Screen components
  hooks/                # Custom React hooks
  services/             # API & storage services
  utils/                # Pure helper functions
  constants/            # Theme, config, environment
  types/                # Shared TypeScript types
```

## 🎨 Design System

The app uses a centralized theme system (`src/constants/theme.ts`) with:

- **Color palettes** — Light & dark schemes with semantic tokens
- **Typography** — Font sizes, weights, and line heights
- **Spacing** — Consistent spacing scale (4px → 64px)
- **Shadows** — Elevation presets for cards and surfaces
- **Border radii** — From subtle (4px) to pill (9999px)

Access via the `useAppTheme()` hook — never hardcode visual values.

## 📄 License

This project is private and not currently licensed for public distribution.
