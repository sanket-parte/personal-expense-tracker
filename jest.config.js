/** @type {import('jest').Config} */
const config = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['./jest.setup.js'],
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/types/**/*',
        '!src/**/index.ts', // Exclude barrel files
        '!src/constants/**/*', // Exclude constants
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};

module.exports = config;
