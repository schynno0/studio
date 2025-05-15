"use client";

import { useState, useEffect, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getInitialTheme = (): string => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  // Default for SSR or if window is not available yet, client-side useEffect will correct this.
  // It's safer to default to 'light' to avoid a flash if the system preference is light and no localStorage is set.
  // Or, match the initial HTML class if one is set (though we are removing it from layout.tsx for this dynamic approach).
  return 'light'; 
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client after hydration.
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
  }, []); 

  useEffect(() => {
    // This effect applies the theme to the document and saves it to localStorage.
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else { // theme === 'light'
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  // Prevent rendering the button until theme is determined to avoid UI flicker
  if (theme === null) {
    // Placeholder to prevent layout shift while theme is being determined
    return <div className="w-10 h-10" />; // Matches Button size="icon"
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300" />
      )}
    </Button>
  );
}
