import React, { createContext, useContext, useReducer, ReactNode } from 'react';

/**
 * UIState
 * Represents the shape of the UI context state.
 */
interface UIState {
  /** Whether a global loading indicator should be shown */
  isLoading: boolean;
  /** Global error message, or null when there's no error */
  globalError: string | null;
}

/**
 * Actions accepted by the UI reducer.
 * - SET_LOADING: toggle global loading
 * - SET_ERROR: set or clear global error
 */
type UIAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

/**
 * initialState
 * Public initial state for tests and consumers that need a default snapshot.
 */
export const initialState: UIState = {
  isLoading: false,
  globalError: null,
};

/**
 * UIReducer
 * Reducer handling UIAction to produce a new UIState
 * Exported for unit testing the reducer directly.
 */
export const UIReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, globalError: action.payload };
    default:
      return state;
  }
};

/**
 * UIContextType
 * Value exposed through the context: state + helpers
 */
interface UIContextType extends UIState {
  /** Set the global loading flag */
  setLoading: (loading: boolean) => void;
  /** Set or clear the global error message */
  setError: (error: string | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

/**
 * UIProvider
 * Wrap this around your app (or subtree) to provide UI state.
 *
 * Props:
 * - children: ReactNode - the subtree that will receive the context
 */
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, initialState);

  /** Dispatch helper to set loading */
  const setLoading = (loading: boolean): void => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  /** Dispatch helper to set/clear global error */
  const setError = (error: string | null): void => {
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

/**
 * useUI
 * Custom hook that returns UIContextType. Throws error if used outside a UIProvider.
 *
 * Returns:
 * - isLoading: boolean
 * - globalError: string | null
 * - setLoading(loading: boolean): void
 * - setError(error: string | null): void
 */
export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
