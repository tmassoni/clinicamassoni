import { defineConfig, devices } from '@playwright/test'

const PORT = 4399
const baseURL = `http://localhost:${PORT}`

/**
 * Runs against a production build, not `next dev` — the point is to catch what
 * ships. `bun test` covers the content contracts; this covers rendering,
 * navigation and accessibility.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],

  webServer: {
    command: `bun run build && bun run start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
