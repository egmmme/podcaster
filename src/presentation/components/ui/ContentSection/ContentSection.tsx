import React from 'react';
import './ContentSection.css';

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <section className={`content-section ${className}`}>{children}</section>
  );
};

export default ContentSection;
