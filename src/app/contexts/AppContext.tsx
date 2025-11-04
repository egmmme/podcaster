import React, { ReactNode } from 'react';
import { UIProvider } from './UIContext';
import { PodcastProvider } from './PodcastContext';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <UIProvider>
            <PodcastProvider>
                {children}
            </PodcastProvider>
        </UIProvider>
    );
};