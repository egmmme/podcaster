// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        'prefer-const': 'error',
        // Enforce alias usage for root folders instead of deep relative imports
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: [
                            '../app/*',
                            '../../app/*',
                            '../../../app/*',
                            '../../../../app/*',
                            '../../../../../app/*',
                        ],
                        message: 'Use @app/* alias instead of relative path',
                    },
                    {
                        group: [
                            '../domain/*',
                            '../../domain/*',
                            '../../../domain/*',
                            '../../../../domain/*',
                            '../../../../../domain/*',
                        ],
                        message: 'Use @domain/* alias instead of relative path',
                    },
                    {
                        group: [
                            '../services/*',
                            '../../services/*',
                            '../../../services/*',
                            '../../../../services/*',
                            '../../../../../services/*',
                        ],
                        message: 'Use @services/* alias instead of relative path',
                    },
                    {
                        group: [
                            '../presentation/*',
                            '../../presentation/*',
                            '../../../presentation/*',
                            '../../../../presentation/*',
                            '../../../../../presentation/*',
                        ],
                        message: 'Use @presentation/* alias instead of relative path',
                    },
                    {
                        group: [
                            '../shared/*',
                            '../../shared/*',
                            '../../../shared/*',
                            '../../../../shared/*',
                            '../../../../../shared/*',
                        ],
                        message: 'Use @shared/* alias instead of relative path',
                    },
                ],
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};