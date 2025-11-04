import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    className = ''
}) => {
    return (
        <div className={`loading-spinner loading-spinner--${size} ${className}`}>
            <div className="loading-spinner__spinner"></div>
        </div>
    );
};