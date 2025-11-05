# Podcaster

A modern, secure Single Page Application (SPA) for browsing and listening to podcasts, built with React, TypeScript, and a clean architecture approach.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm 8+

### Development

```bash
npm install
npm run dev
```

App runs on http://localhost:3000

### Production Build

```bash
npm run build
npm i -g serve      # Install serve package globally
npm run serve:build # Serve the production build
```
> **_NOTE:_**  The application can be deployed to any static hosting service
> once `npm run build` is executed, deploy `/dist` folder to your preferred platform

### Testing & Quality

```bash
npm run validate        # Code TS/CSS linting, TypeScript validation and run tests
npm run test:threshold  # Run tests with coverage and fail if global coverage < 70%
npm run analyze         # Bundle analysis
```

## 🏗️ Architecture
### Tech stack
- Frontend: React 18, TypeScript
- Routing: React Router DOM
- State Management: Context API + useReducer
- Build Tool: Webpack 5 (custom configuration)
- Styling: CSS3 with CSS Variables
- Testing: Jest + React Testing Library
### Key Design Decisions
* SPA over SSR
  * Choice: Client-side Single Page Application
  * Reason: Explicit requirement in the test specifications
  * Benefits: Faster navigation, better UX for podcast browsing
* State Management
  * Choice: React Context API + useReducer
  * Reason: Project requirements prohibited Redux/Zustand
  * Benefits: Built-in React solution, minimal bundle size
* Security
  * Implementation: DOMPurify for HTML sanitization
  * Reason: External API content requires protection against XSS
  * Result: Safe rendering of podcast descriptions while preserving basic formatting
## 🎨 UI/UX Features
### Responsive Design
The application implements a desktop-first responsive approach:
* Desktop (1024px+): Full sidebar + content layout
* Tablet (768px-1023px): Compact sidebar, optimized content
* Mobile (<768px): Single column, touch-friendly interface

All components adapt seamlessly using CSS Grid, Flexbox, and strategic breakpoints.

### Design System
* CSS Variables for consistent theming
* Custom components built from scratch (no UI libraries)
* Accessible audio player with native HTML5 controls
* Loading states and error handling throughout

## 🔧 Core Features
### Podcast Browsing
* Top 100 podcasts from Apple iTunes
* Real-time search/filter by title and author
* 24-hour client-side caching for performance

### Podcast Details
* Episode listings with publication dates
* Secure HTML description rendering
* Sidebar with podcast metadata

### Episode Player
* Native HTML5 audio player
* Safe content rendering with DOMPurify
* Responsive audio controls

## 🧪 Testing Strategy
### Coverage Goals
* Unit Tests: Components and utilities
* Integration Tests: Hook behaviors and data flow
* Coverage Threshold: 70%+ across all metrics

## 🚀 Performance & Optimization
### Code Splitting
* Route-based lazy loading with React.lazy()
* Vendor chunk separation for better caching
* Optimized bundle sizes

### Caching Strategy
* Client-side: localStorage with 24-hour expiration
* API: Efficient re-fetching only when cache expires
* Assets: Webpack optimization with content hashing

## 📱 Browser Support
* Chrome (latest) - as specified in requirements
* Secondary: Modern evergreen browsers
## 🔒 Security
* HTML Sanitization: All external content passed through DOMPurify
* Safe Links: External links open with rel="noopener noreferrer"
* Content Security: Whitelisted HTML tags and attributes only

## Documentation
- **[Responsive Design Guidelines](./docs/responsive-design-guide.md)** - CSS breakpoints, variable usage, and responsive patterns
