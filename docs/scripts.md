# Available Scripts

This project defines the following npm scripts to streamline development, testing, and CI workflows.

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Start development server on port 3000    |
| `npm run build`          | Production build with optimizations      |
| `npm run serve:build`    | Serve production build locally           |
| `npm run test`           | Run test suite                           |
| `npm run test:watch`     | Run tests in watch mode                  |
| `npm run test:coverage`  | Generate coverage report                 |
| `npm run test:threshold` | Enforce 70% coverage minimum             |
| `npm run type-check`     | TypeScript type validation               |
| `npm run lint`           | Lint TypeScript/React code               |
| `npm run lint:css`       | Lint CSS files                           |
| `npm run validate`       | Run type-check + lint + tests (CI-ready) |
| `npm run analyze`        | Visualize production bundle composition  |

Notes

- The dev server runs at http://localhost:3000 with HMR and history fallback.
- `serve:build` requires the `serve` package to be installed globally: `npm i -g serve`.
- Coverage threshold is enforced at 70% across statements, branches, functions, and lines.
