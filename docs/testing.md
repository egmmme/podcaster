# Testing Strategy

Essentials for keeping tests fast, focused, and reliable (Jest + React Testing Library).

## Philosophy

- User-centric: test behavior, not implementation details.
- Maintainable: clear, minimal tests that reflect real usage.

## Coverage

- Target ≥ 70% for branches, functions, lines, and statements.
- Enforce with: `npm run test:threshold`.

## What to test

- Unit: components (render/props/interactions), utilities, services (API, cache, storage).
- Integration: hooks, context providers, and pages with routing.

## Commands

```bash
npm run test           # run once
npm run test:watch     # watch mode
npm run test:coverage  # coverage report
npm run validate       # type-check + lint + tests
```

## CI

- Run `npm run validate` and `npm run test:threshold` in your pipeline.

## Roadmap

- E2E (Playwright/Cypress), a11y audits, performance checks, mutation testing.
