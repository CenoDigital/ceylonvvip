import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: { name: 'unit', include: ['src/**/*.test.ts', 'src/**/*.test.tsx'] },
      },
      {
        // Needs Postgres: docker compose locally, a service container in CI.
        extends: true,
        test: {
          name: 'int',
          include: ['tests/int/**/*.int.spec.ts'],
          setupFiles: ['dotenv/config'],
          testTimeout: 60_000,
          hookTimeout: 60_000,
        },
      },
    ],
  },
})
