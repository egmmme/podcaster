// Mock CSS alias import so Jest doesn't try to load actual CSS through alias mapping
jest.mock('@shared/styles/variables.css', () => ({}), { virtual: true });
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@presentation/App';

// Smoke test to ensure App renders without crashing and shows header
describe('App root', () => {
  test('renders application header', async () => {
    render(<App />);
    // Wait for header with async query to ensure Suspense settles
    expect(
      await screen.findByRole('heading', { name: /podcaster/i })
    ).toBeInTheDocument();
  });
});
