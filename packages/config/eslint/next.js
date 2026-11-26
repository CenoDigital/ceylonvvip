import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

/** ESLint flat config for Next.js apps. */
export default [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    ignores: [
      '.next/**',
      'next-env.d.ts',
      'src/app/(payload)/admin/importMap.js',
      'src/migrations/**',
    ],
  },
  prettier,
]
