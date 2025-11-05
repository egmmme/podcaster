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

## 🎯 Key Decisions & Features

- **[Architecture](./docs/architecture.md)** - Tech stack, project structure, design decisions, and patterns
- **[UX-UI Features](./docs/uxui-features.md)** - Core UI/UX details
- **[Features](./docs/features.md)** - Core functionality and data flow
- **[Testing](./docs/testing.md)** - Testing strategy, coverage goals, and best practices
- **[Performance](./docs/performance.md)** - Optimization techniques, caching, and bundle analysis
- **[Security](./docs/security.md)** - XSS prevention, HTML sanitization, and security best practices
- **[Available Scripts](./docs/scripts.md)** - Development and CI commands



## 🧪 Quality Assurance

- **Type Safety**: Full TypeScript coverage
- **Linting**: ESLint + Stylelint with strict rules
- **Testing**: 70%+ coverage across all metrics
- **CI-Ready**: `npm run validate` for automated checks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

See the full guide: [docs/contributing.md](./docs/contributing.md)
