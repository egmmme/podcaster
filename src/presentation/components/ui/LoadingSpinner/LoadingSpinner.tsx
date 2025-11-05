import React from 'react';
import './LoadingSpinner.css';

/**
 * Props for the LoadingSpinner component.
 */
interface LoadingSpinnerProps {
  /** Visual size of the spinner (default: medium) */
  size?: 'small' | 'medium' | 'large';
  /** Optional CSS class name */
  className?: string;
}

/**
 * Simple CSS-based loading spinner.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = '',
}) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      <div className="loading-spinner__spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
