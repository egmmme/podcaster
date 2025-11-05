import '@testing-library/jest-dom';

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Quiet known noisy warnings in tests while keeping others visible
const originalWarn = console.warn.bind(console);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(console as any).warn = (...args: unknown[]): void => {
  const first = String(args[0] ?? '');
  if (first.includes('React Router Future Flag Warning')) return; // ignore RR v7 future flag messages
  originalWarn(...(args as [unknown, ...unknown[]]));
};

const originalError = console.error.bind(console);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(console as any).error = (...args: unknown[]): void => {
  const first = String(args[0] ?? '');
  if (first.includes('A suspended resource finished loading inside a test'))
    return; // noisy Suspense act warning
  originalError(...(args as [unknown, ...unknown[]]));
};
