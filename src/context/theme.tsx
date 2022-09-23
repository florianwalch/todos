import { createContext, type ReactNode, useContext } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { useLocalStorage } from '@/hooks/localstorage';

import { darkTheme } from '@/themes/dark';
import { lightTheme } from '@/themes/light';

// available themes
export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light',
}

// type of context
type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

// type of component props
type ThemeContextWrapperProps = {
  children: ReactNode;
};

// create context
export const ThemeContext = createContext<ThemeContextType | null>(null);

// provide access to context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  /* istanbul ignore next */
  if (context == null) {
    throw 'ThemeContext is missing';
  }

  return context;
};

/**
 * Context wrapper for the current theme.
 * Provides function to change the theme &
 * sets up the MUI theme.
 *
 * @param {ThemeContextWrapperProps} props - component props
 */
export function ThemeContextWrapper({ children }: ThemeContextWrapperProps) {
  // read/write current theme to local storage
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', ThemeType.DARK);

  // build context value
  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme === ThemeType.DARK ? darkTheme : lightTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
