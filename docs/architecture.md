# Architecture

## Project Structure

```
src/
├── app/                    # Application layer
│   ├── contexts/          # React Context providers
│   └── hooks/             # Custom React hooks
├── domain/                # Business logic layer
│   ├── entities/          # Core data models
│   └── types/             # TypeScript type definitions
├── presentation/          # UI layer
│   ├── components/        # Reusable UI components
│   ├── layouts/           # Page layouts
│   └── pages/             # Route-level pages
├── services/              # External services
│   ├── api/              # HTTP client and API calls
│   └── cache/            # Client-side caching
└── shared/               # Shared utilities
    ├── constants/        # App-wide constants
    └── styles/           # Global CSS variables
```

## Key Design Decisions

### State Management

- **Choice**: React Context API + useReducer
- **Reason**: Project requirements prohibited Redux/Zustand
- **Benefits**: Built-in React solution, minimal bundle size, type-safe with TypeScript
- **Implementation**: Separate contexts for different concerns (App, Podcast, UI)

### Custom Webpack Configuration

- **Choice**: Custom Webpack 5 setup over Create React App
- **Benefits**: Full control over build process, optimized bundle splitting, custom path aliases
- **Features**: Production optimization, development hot reloading, bundle analysis

### Path Aliases

TypeScript path aliases for cleaner imports:

```typescript
import { usePodcasts } from '@app/hooks/usePodcasts';
import { Podcast } from '@domain/entities';
import { PodcastApiService } from '@services/api/podcastApi';
```

Configured in both `tsconfig.json` and `webpack.config.js`.

## Design Patterns

### Layered Architecture

The application follows a clean architecture approach with clear separation of concerns:

1. **Domain Layer**: Pure business logic, no framework dependencies
2. **Services Layer**: API calls, caching, external integrations
3. **Application Layer**: State management, business logic orchestration
4. **Presentation Layer**: React components, UI logic only

### Component Design

- **Functional Components**: All components use React hooks
- **Props Interface**: Every component has a typed props interface with JSDoc
- **Composition**: Prefer composition over inheritance
- **Single Responsibility**: Each component has one clear purpose

### State Management Strategy

- **AppContext**: Global app state (loading states)
- **PodcastContext**: Podcast data and filtering
- **UIContext**: UI-specific state (modals, notifications)

## Browser Support

- **Primary**: Chrome (latest) - as specified in requirements
- **Secondary**: Modern evergreen browsers (Firefox, Safari, Edge)
- **Minimum**: Browsers supporting ES6, CSS Grid, and Flexbox
