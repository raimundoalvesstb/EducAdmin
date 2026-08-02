import React from 'react';

export const LogoSquare = ({ className = "w-10 h-10", fill = "currentColor" }: { className?: string, fill?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="EducAdmin Logo"
    role="img"
  >
    <rect width="100" height="100" rx="24" className="fill-primary" />
    <path
      d="M30 45L50 35L70 45V65L50 75L30 65V45Z"
      className="stroke-primary-foreground fill-primary-foreground/20"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 35V75M30 45L70 65M70 45L30 65"
      className="stroke-primary-foreground/40"
      strokeWidth="2"
    />
  </svg>
);