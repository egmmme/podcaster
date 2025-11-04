export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.tsx',
        '!src/**/*.d.ts',
    ],
};