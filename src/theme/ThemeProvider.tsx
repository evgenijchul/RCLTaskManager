import React, { createContext, useContext } from 'react';
import { useThemeController } from './useThemeController';

type ThemeContextValue = ReturnType<typeof useThemeController>;

const ThemeContext = createContext<ThemeContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const value = useThemeController();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within <ThemeProvider />');
  }
  return ctx;
};
