import React from 'react';
import './ContentSection.css';

/**
 * Props for the ContentSection layout component.
 */
interface ContentSectionProps {
  /** Section content */
  children: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Semantic section wrapper that applies app-consistent spacing and styling.
 */
export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <section className={`content-section ${className}`}>{children}</section>
  );
};

export default ContentSection;
