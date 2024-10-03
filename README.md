# E2E Tests

# Step 1
Run `npm install` command -- This will install all the required dependencies

# Step 2
Run `npm run test` command -- This will execute all the testcases at once.

# Some Basic commands for execution
Runs all the end-to-end tests: npx playwright test

Starts the interactive UI mode: npx playwright test --ui

Runs tests only on Desktop Chrome: npx playwright test --project=chromium

Runs tests of a specific file: npx playwright test tests.spec.ts

Runs the tests in debug mode: npx playwright test --debug
