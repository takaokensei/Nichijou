import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('rotina-theme') as Theme;
      if (saved) return saved;
    } catch (e) {}
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('rotina-theme', newTheme);
    } catch (e) {}
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev: Theme) => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, setTheme, toggleTheme };
}
