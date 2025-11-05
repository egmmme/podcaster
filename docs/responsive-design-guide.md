# Responsive Design Guidelines

## Overview

This project implements a desktop-first responsive design strategy using `max-width` media queries. Default styles target desktop viewports, with progressive enhancements for smaller screens.

## Breakpoint Specification

| Breakpoint | Value    | Target Devices           |
| ---------- | -------- | ------------------------ |
| xs         | < 640px  | Small mobile devices     |
| sm         | ≤ 640px  | Mobile devices           |
| md         | ≤ 768px  | Tablets and large phones |
| lg         | ≤ 1024px | Small laptops            |
| xl         | ≤ 1280px | Standard desktops        |
| 2xl        | ≤ 1536px | Large displays           |

## Implementation Pattern

Default styles apply to desktop viewports. Use media queries with `max-width` to override styles for smaller viewports:

```css
.component {
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  .component {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 640px) {
  .component {
    padding: var(--spacing-md);
    flex-direction: column;
  }
}
```

## Standards and Requirements

### CSS Variable Usage

All styles must reference design tokens from `src/shared/styles/variables.css`:

```css
/* Required */
padding: var(--spacing-lg);
color: var(--color-primary);
border-radius: var(--border-radius-md);

/* Not permitted */
padding: 24px;
color: #2d5b8a;
border-radius: 8px;
```

### Common Responsive Patterns

**Layout Adaptation:**

```css
.container {
  display: flex;
  gap: var(--spacing-lg);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

**Viewport-Relative Sizing:**

```css
.element {
  max-width: 800px;
}

@media (max-width: 768px) {
  .element {
    max-width: 100%;
  }
}
```

**Conditional Display:**

```css
.desktop-only {
  display: block;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
}
```

## Testing Protocol

### Browser DevTools Testing

1. Open DevTools (`F12`)
2. Enable device toolbar (`Ctrl+Shift+M`)
3. Test at standard breakpoints: 375px, 640px, 768px, 1024px, 1280px

### Reference Viewport Dimensions

- **Mobile**: 375px (iPhone SE), 390px (iPhone 12 Pro)
- **Tablet**: 768px (iPad Mini), 820px (iPad Air)
- **Desktop**: 1024px, 1280px, 1920px

## Project Implementation

The following components currently implement responsive behavior:

| Component         | File            | Responsive Features              |
| ----------------- | --------------- | -------------------------------- |
| Application Shell | `AppLayout.css` | Adaptive padding                 |
| Podcast Grid      | `HomePage.css`  | Dynamic column layout            |
| Navigation Header | `Header.css`    | Orientation and layout switching |

All new components should follow these established patterns.
