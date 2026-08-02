"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Users, BookOpen, Settings, Moon, Sun, Contrast } from 'lucide-react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ClipboardList, BookCheck } from 'lucide-react';

const navItems = [
  { name: 'Início', href: '/', icon: <Home className="w-5 h-5" /> },
  { name: 'Alunos', href: '/alunos', icon: <Users className="w-5 h-5" /> },
  { name: 'Turmas', href: '/turmas', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Matrículas', href: '/matriculas', icon: <ClipboardList className="w-5 h-5" /> },
  { name: 'Diário', href: '/diario', icon: <BookCheck className="w-5 h-5" /> },
  { name: 'Configurações', href: '#config', icon: <Settings className="w-5 h-5" /> },
];

export const TopMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.remove('dark', 'high-contrast');

    if (theme === 'light') {
      html.classList.add('dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      html.classList.add('high-contrast');
      setTheme('high-contrast');
    } else {
      setTheme('light');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-4 rounded-full transition-all duration-300",
        scrolled ? "glass shadow-lg" : "bg-background/40 backdrop-blur-md border border-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md">
          E
        </div>
        <span className="font-bold text-xl text-foreground hidden sm:block tracking-tight">
          EducAdmin
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-4 py-2 rounded-full text-foreground hover:bg-muted/50 hover:text-primary transition-colors flex items-center gap-2 font-medium"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted/50 text-foreground transition-colors"
          aria-label="Alternar Tema"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : theme === 'dark' ? <Contrast className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-muted/50 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 glass rounded-3xl p-4 flex flex-col gap-2 md:hidden origin-top shadow-xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-2xl text-foreground hover:bg-muted/50 hover:text-primary transition-colors flex items-center gap-3 font-medium text-lg"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
