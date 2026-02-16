// eslint.config.js — ESLint v9 flat config format
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    // ─── Ignored paths ─────────────────────────────────────────────
    {
        ignores: ['node_modules/', 'dist/', '.expo/', 'babel.config.js', 'eslint.config.js'],
    },

    // ─── TypeScript + React Native source files ────────────────────
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            // TypeScript
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                { prefer: 'type-imports' },
            ],

            // General
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'warn',
            'no-var': 'error',
        },
    },

    // ─── Prettier overrides (must be last) ─────────────────────────
    prettierConfig,
];
