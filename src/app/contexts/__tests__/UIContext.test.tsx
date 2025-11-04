import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UIProvider, useUI, UIReducer, initialState } from '../UIContext';

describe('UIContext', () => {
    test('useUI thrown render is caught by an ErrorBoundary (no noisy console output)', () => {
        class TestBoundary extends React.Component<any, { hasError: boolean }> {
            constructor(props: any) {
                super(props);
                this.state = { hasError: false };
            }

            static getDerivedStateFromError() {
                return { hasError: true };
            }

            componentDidCatch() {
                // intentionally empty; we just want to swallow the error inside the boundary
            }

            render() {
                if (this.state.hasError) return <div>error-caught</div>;
                return this.props.children;
            }
        }

        const Bad: React.FC = () => {
            // calling the hook without provider will throw during render
            useUI();
            return null;
        };

        // suppress React error logging for this assertion so test output remains clean
        const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
        render(
            <TestBoundary>
                <Bad />
            </TestBoundary>
        );

        expect(screen.getByText('error-caught')).toBeTruthy();
        spy.mockRestore();
    });

    test('UIProvider provides state and actions', () => {
        const TestComp: React.FC = () => {
            const { isLoading, setLoading, globalError, setError } = useUI();
            return (
                <div>
                    <span data-testid="loading">{isLoading ? 'true' : 'false'}</span>
                    <button onClick={() => setLoading(!isLoading)}>toggle</button>
                    <span data-testid="error">{globalError ?? 'null'}</span>
                    <button onClick={() => setError('oops')}>err</button>
                </div>
            );
        };

        render(
            <UIProvider>
                <TestComp />
            </UIProvider>
        );

        expect(screen.getByTestId('loading').textContent).toBe('false');
        fireEvent.click(screen.getByText('toggle'));
        expect(screen.getByTestId('loading').textContent).toBe('true');

        fireEvent.click(screen.getByText('err'));
        expect(screen.getByTestId('error').textContent).toBe('oops');
    });

    test('UIReducer handles actions correctly', () => {
        const s1 = UIReducer(initialState, { type: 'SET_LOADING', payload: true });
        expect(s1.isLoading).toBe(true);

        const s2 = UIReducer(s1, { type: 'SET_ERROR', payload: 'boom' });
        expect(s2.globalError).toBe('boom');

        const s3 = UIReducer(s2, { type: 'SET_LOADING', payload: false });
        expect(s3.isLoading).toBe(false);

        const s4 = UIReducer(s3, { type: 'SET_ERROR', payload: null });
        expect(s4.globalError).toBeNull();
    });
});
