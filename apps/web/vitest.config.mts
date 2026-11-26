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
          // One database: files run one after another so migrations and data never race.
          fileParallelism: false,
          setupFiles: ['dotenv/config'],
          testTimeout: 60_000,
          hookTimeout: 60_000,
        },
      },
    ],
  },
})
