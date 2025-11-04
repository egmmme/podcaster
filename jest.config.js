export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapping: {
        '^@application/(.*)$': '<rootDir>/src/application/$1',
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '\\.(css)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.tsx',
        '!src/**/*.d.ts',
    ],
};