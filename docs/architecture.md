# Architecture

Clean layers with clear boundaries and path aliases for maintainability.

## Structure

```
src/
├─ app/           # contexts, hooks (state orchestration)
├─ domain/        # entities, types (pure models)
├─ presentation/  # components, layouts, pages (UI)
├─ services/      # api, cache (I/O)
└─ shared/        # constants, styles
```

## Layers (at a glance)

- Domain → Services → Application → Presentation
- Application: Context + reducers; hooks for async/data logic.
- Presentation: UI-only components, typed props, small and composable.

## State

- Context + useReducer (no Redux/Zustand).
- Contexts: App (loading), Podcast (data + filter), UI (view state).

## Build & Aliases

- Webpack 5 with code splitting and analysis; TS path aliases:

```ts
import { usePodcasts } from '@app/hooks/usePodcasts';
import { Podcast } from '@domain/entities';
import { PodcastApiService } from '@services/api/podcastApi';
```

Configured in `tsconfig.json` and `webpack.config.js`.

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge).
