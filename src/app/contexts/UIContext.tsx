import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface UIState {
    isLoading: boolean;
    globalError: string | null;
}

type UIAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: UIState = {
    isLoading: false,
    globalError: null,
};

const UIReducer = (state: UIState, action: UIAction): UIState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, globalError: action.payload };
        default:
            return state;
    }
};

interface UIContextType extends UIState {
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(UIReducer, initialState);

    const setLoading = (loading: boolean) => {
        dispatch({ type: 'SET_LOADING', payload: loading });
    };

    const setError = (error: string | null) => {
        dispatch({ type: 'SET_ERROR', payload: error });
    };

    return (
        <UIContext.Provider
            value={{
                ...state,
                setLoading,
                setError,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};

export const useUI = (): UIContextType => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};