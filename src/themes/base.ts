import { createTheme as createMuiTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

/**
 * Create theme for given mode.
 *
 * @param {'light' | 'dark'} mode - theme mode
 * @param {{}} opts - theme options
 */
export function createTheme(mode: 'light' | 'dark', opts = {}) {
  // create theme & merge options
  const theme = createMuiTheme(
    deepmerge(
      {
        spacing: 5,
        palette: {
          mode,
        },
      },
      opts,
    ),
  );

  // override component styles
  return {
    ...theme,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body, #app': {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          },
          html: {
            WebkitFontSmoothing: 'auto',
          },
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: '20px',
          },
          '*': {
            '&::-webkit-scrollbar': {
              width: 0,
            },
          },

          [theme.breakpoints.up('md')]: {
            '*': {
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme.palette.grey['400']} transparent`,
              '&::-webkit-scrollbar': {
                width: 10,
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
                marginBlock: 20,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 8,
                backgroundColor: theme.palette.grey['400'],
              },
              '&::-webkit-scrollbar-corner': {
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },

      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: 0,
            [theme.breakpoints.up('sm')]: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
      },

      MuiInput: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              WebkitTextFillColor: theme.palette.text.primary,
              WebkitBackgroundClip: 'text',
            },
          },
        },
      },
    },
  };
}
