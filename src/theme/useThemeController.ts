import { useState } from 'react';
import { StatusBarStyle, useColorScheme } from 'react-native';
import { AppTheme, getTheme } from './theme';

/**
 * App-level theming hook.
 * 
 * Behavior: follows system theme until user toggles manually.
 */

type ThemeController = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  theme: AppTheme;
  barStyle: StatusBarStyle;
};

export const useThemeController = (): ThemeController => {
  const systemScheme = useColorScheme();

  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const isDarkMode = userOverride ?? systemScheme === 'dark';

  const setIsDarkMode = (value: boolean) => setUserOverride(value);

  const theme: AppTheme = getTheme(isDarkMode);
  const barStyle: StatusBarStyle = isDarkMode
    ? 'light-content'
    : 'dark-content';

  return { isDarkMode, setIsDarkMode, theme, barStyle };
};
