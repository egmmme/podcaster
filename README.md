# Podcaster

A modern, secure React application for browsing and listening to podcasts from Apple iTunes. Built with TypeScript, clean architecture, and security-first principles.

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
npm run serve:build  # Requires: npm i -g serve
```

Deploy the `/dist` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript 4.9
- **Routing**: React Router DOM v6
- **State**: Context API + useReducer
- **Build**: Webpack 5 (custom config)
- **Styling**: CSS3 + CSS Variables
- **Testing**: Jest + React Testing Library
- **Security**: DOMPurify

## 🎯 Key Features

### Podcast Discovery

- Browse top 100 podcasts from iTunes
- Real-time search and filtering
- Responsive grid layout

### Episode Playback

- Native HTML5 audio player
- Secure episode description rendering
- Persistent podcast sidebar

### Performance

- Route-based code splitting
- 24-hour client-side caching
- Optimized bundle sizes (~215 KB total)

### Security

- DOMPurify HTML sanitization
- Whitelisted tags and attributes
- Hardened external links

## 🧪 Quality Assurance

- **Type Safety**: Full TypeScript coverage
- **Linting**: ESLint + Stylelint with strict rules
- **Testing**: 70%+ coverage across all metrics
- **CI-Ready**: `npm run validate` for automated checks

## 📱 Browser Support

- **Primary**: Chrome (latest)
- **Secondary**: Modern evergreen browsers (Firefox, Safari, Edge)

## Documentation

- **[Architecture](./docs/architecture.md)** - Tech stack, project structure, design decisions, and patterns
- **[Features](./docs/features.md)** - Core functionality, UI/UX details, and data flow
- **[Testing](./docs/testing.md)** - Testing strategy, coverage goals, and best practices
- **[Performance](./docs/performance.md)** - Optimization techniques, caching, and bundle analysis
- **[Security](./docs/security.md)** - XSS prevention, HTML sanitization, and security best practices
- **[Responsive Design](./docs/responsive-design-guide.md)** - Breakpoints, CSS variables, and responsive patterns
- **[Available Scripts](./docs/scripts.md)** - Development and CI commands

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

See the full guide: [docs/contributing.md](./docs/contributing.md)
