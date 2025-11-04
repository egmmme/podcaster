import React, { ReactNode } from 'react';
import { UIProvider } from './UIContext';
import { PodcastProvider } from './PodcastContext';

interface AppProviderProps {
    children: ReactNode;
}

/**
 * AppProvider
 * Composes application-level providers into a single wrapper component.
 *
 * Currently composes:
 * - UIProvider: provides global UI state (loading, global error)
 * - PodcastProvider: provides podcast domain state (list, selected podcast, episodes, filter)
 * Props:
 * - children: ReactNode - the subtree that will receive the contexts
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <UIProvider>
            <PodcastProvider>
                {children}
            </PodcastProvider>
        </UIProvider>
    );
};