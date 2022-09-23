import { type Story, type StoryContext } from '@storybook/react';
import { themes } from '@storybook/theming';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from '@/themes/light';
import { darkTheme } from '@/themes/dark';

// default parameters
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  docs: {
    theme: themes.dark,
  },

  backgrounds: { disable: true },
};

// add theme switcher
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

// add theme decorator
export const decorators = [
  (Story: Story, context: StoryContext) => {
    return (
      <ThemeProvider
        theme={context.globals.theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline enableColorScheme />
        <Story />
      </ThemeProvider>
    );
  },
];
