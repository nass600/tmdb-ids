module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'standard',
        'plugin:json/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'class-property'
    ],
    rules: {
        indent: 'off',
        'max-len': ['error', { code: 120 }]
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended'
            ],
            plugins: [
                '@typescript-eslint'
            ],
            rules: {
                '@typescript-eslint/indent': ['error'],
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': ['error'],
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/ban-types': [
                    'error',
                    {
                        extendDefaults: true,
                        types: {
                            '{}': false
                        }
                    }
                ]
            }
        }
    ]
}
