import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'coverage/**', 'next-env.d.ts'],
  },
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // The waiting-list API is allowed to emit non-identifying operational logs.
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', 'vitest.setup.ts', 'scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
];

export default eslintConfig;
