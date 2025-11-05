export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.tsx',
        '!src/**/*.d.ts',
    ],
};