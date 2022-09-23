import { createTheme } from '@/themes/base';

// create default MUI theme with light mode
const theme = createTheme('light');

// export with overrides
export const lightTheme = {
  ...theme,

  // overrides here
  palette: {
    ...theme.palette,
    background: {
      ...theme.palette.background,
      default: theme.palette.grey['300'],
    },
  },
};
