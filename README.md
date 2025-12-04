[![CI/CD Pipeline](https://github.com/egmmme/podcaster/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/egmmme/podcaster/actions/workflows/build-and-test.yml)
# Podcaster

A modern React + TypeScript app for browsing iTunes podcasts with secure HTML rendering and 24h client-side caching.

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

## 🏗️ At a glance

React 18 + TypeScript • React Router v6 • Context + useReducer • Webpack 5 • Jest + RTL • DOMPurify

## 📚 Docs

- [Architecture](./docs/architecture.md)
- [UX/UI decisions](./docs/uxui-features.md)
- [Features](./docs/features.md)
- [Testing](./docs/testing.md)
- [Performance](./docs/performance.md)
- [Security](./docs/security.md)
- [Available Scripts](./docs/scripts.md)

## ✅ Quality

Run validation locally or in CI:

```bash
npm run validate
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 [Contributing](./docs/contributing.md)
