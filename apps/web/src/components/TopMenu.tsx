"use client";

import React, { useRef, useEffect } from 'react';

export const TopMenu: React.FC = () => {
  const scrollRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.textContent = window.scrollY.toString();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize value
    if (scrollRef.current) {
      scrollRef.current.textContent = window.scrollY.toString();
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white' }}>
      Top Menu - Scroll Y: <span ref={scrollRef}>0</span>
    </div>
  );
};
