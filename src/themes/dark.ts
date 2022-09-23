import { createTheme } from '@/themes/base';

// create default MUI theme with dark mode
export const darkTheme = createTheme('dark', {
  palette: {
    primary: {
      main: '#3282B8',
      light: '#BBE1FA',
      dark: '#0F4C75',
    },
  },
});
