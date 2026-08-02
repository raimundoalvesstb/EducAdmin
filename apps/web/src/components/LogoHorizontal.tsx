import React from 'react';
import { LogoSquare } from './LogoSquare';

export const LogoHorizontal = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <LogoSquare className="w-10 h-10 flex-shrink-0" />
    <span className="font-bold text-2xl text-foreground tracking-tight select-none">
      EducAdmin
    </span>
  </div>
);