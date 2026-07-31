import React, { useState, useEffect } from 'react';

export const TopMenu: React.FC = () => {
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setLastScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white' }}>
      Top Menu - Scroll Y: {lastScrollY}
    </div>
  );
};
