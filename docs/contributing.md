# Contributing Guide

Thanks for your interest in contributing! To keep the project healthy and consistent, please follow these guidelines.

## Before you start

- Ensure you have Node.js 16+ and npm 8+ installed
- Run the app locally to verify your environment: `npm install` then `npm run dev`

## Contribution checklist

1. Tests pass locally
   - `npm run validate` (type-check + lint + tests)
   - Enforce coverage ≥ 70%: `npm run test:threshold`
2. Code style and patterns
   - Follow existing architecture and conventions (contexts/hooks, services, cache, presentation)
   - Use path aliases (`@app`, `@services`, etc.)
   - Add JSDoc for new components and exported functions
3. Security and accessibility
   - Render external HTML only via `SafeHTMLRenderer`
   - Prefer role-based, accessible components (labels/aria where appropriate)
4. Tests
   - Add focused tests for new logic (Jest + RTL)
   - Prefer hooks/services tests for data logic and UI tests for rendering/flows

## Pull Requests

- Branch naming: `feat/...`, `fix/...`, or `chore/...`
- Keep PRs small and focused; include a clear description of the change and rationale
- If changing public behavior, update or add docs under `docs/`

## Getting help

Open a discussion or issue if you’re unsure about direction or scope. We’re happy to help.
