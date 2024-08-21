/** @type {import('eslint').FlatConfig} */
module.exports = [
  {
    ignores: [
      'node_modules/**',
      'package.json',
      'package-lock.json',
      'tsconfig.json',
    ],
  },
  {
    languageOptions: {
      globals: {
        browser: 'readonly',
        node: 'readonly',
        es2021: true,
      },
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['*.js', '*.jsx'],
    rules: {
      'no-console': 'off', // Example rule for JavaScript files
    },
  },
  {
    files: ['*.json', '.github/*'],
    rules: {
      'prettier/prettier': ['error', { singleQuote: false }],
    },
  },
  {
    files: ['package.json', 'package-lock.json', 'tsconfig.json'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
]
