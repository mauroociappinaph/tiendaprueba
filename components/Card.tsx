import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-surface rounded-2xl p-6 sm:p-8 border border-border shadow-md ${className}`}
    >
      {children}
    </div>
  );
};
