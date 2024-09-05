import antfu from '@antfu/eslint-config'
import * as drizzle from 'eslint-plugin-drizzle'

export default antfu(
  {
    jsx: true,
    react: true,
    typescript: true,
    ignores: ['**/migrations', '**/ui'],
  },
  {
    name: 'drizzle',
    files: ['**/database/**/*.ts'],
    plugins: { drizzle },
    rules: {
      'drizzle/enforce-delete-with-where': ['error', { drizzleObjectName: 'db' }],
      'drizzle/enforce-update-with-where': ['error', { drizzleObjectName: 'db' }],
    },
  },
  {
    files: ['**/service/*.service.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
    },
  },
)
