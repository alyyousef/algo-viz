/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import eslintJs from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tsTypeCheckedRules = (tsPlugin.configs['recommended-type-checked']?.rules ?? {}) as Record<
  string,
  unknown
>

const importRecommendedRules = (importPlugin.configs.recommended.rules ?? {}) as Record<
  string,
  unknown
>

const nodeRecommendedRules = (nPlugin.configs['flat/recommended'].rules ?? {}) as Record<
  string,
  unknown
>

const promiseRecommendedRules = (promisePlugin.configs.recommended.rules ?? {}) as Record<
  string,
  unknown
>

const reactHooksRecommendedRules = (reactHooks.configs.recommended.rules ?? {}) as Record<
  string,
  unknown
>

const jsRecommendedRules = (eslintJs.configs.recommended.rules ?? {}) as Record<string, unknown>

const importOrderRule = [
  'error',
  {
    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
    pathGroups: [
      {
        pattern: '@/**',
        group: 'internal',
      },
    ],
    pathGroupsExcludedImportTypes: ['type'],
    'newlines-between': 'always',
    alphabetize: {
      order: 'asc',
      caseInsensitive: true,
    },
  },
] as const

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      promise: promisePlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tsTypeCheckedRules,
      ...importRecommendedRules,
      ...promiseRecommendedRules,
      ...reactHooksRecommendedRules,
      'import/no-unresolved': 'off',
      'import/order': importOrderRule,
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
            arguments: false,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      semi: 'off',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    rules: {
      ...jsRecommendedRules,
      ...importRecommendedRules,
      ...nodeRecommendedRules,
      ...promiseRecommendedRules,
      'import/no-unresolved': 'off',
      'import/order': importOrderRule,
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-process-env': 'off',
      semi: 'off',
    },
  },
  {
    files: ['vite.config.ts', 'vitest.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importRecommendedRules,
      'import/order': importOrderRule,
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
  eslintConfigPrettier,
]
