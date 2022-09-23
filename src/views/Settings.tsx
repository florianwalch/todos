import { Box, Stack, Typography } from '@mui/material';

import { ThemeType, useThemeContext } from '@/context/theme';

import { Switch } from '@/components/Controls/Switch';
import { MainPaper } from '@/components/Layout/MainPaper/MainPaper';
import { ScrollContainer } from '@/components/Layout/Container/ScrollContainer';
import { Section } from '@/components/Layout/Container/Section';

/**
 * View for /settings route.
 *
 * Provides options to change the theme.
 *
 * TODO: add language switch here.
 */
export function SettingsView() {
  const { theme, setTheme } = useThemeContext();

  return (
    <MainPaper elevation={8}>
      <ScrollContainer flex={1}>
        <Box px={2}>
          <Typography variant="h4" sx={{ mb: 10 }}>
            Settings
          </Typography>

          <Section>
            <Typography variant="subtitle1" mb={5}>
              Change theme
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Light</Typography>
              <Switch
                checked={theme === ThemeType.DARK}
                onChange={(evt) =>
                  setTheme(
                    evt.target.checked ? ThemeType.DARK : ThemeType.LIGHT,
                  )
                }
                inputProps={{
                  // @ts-ignore - data attributes are fine
                  'data-testid': 'theme-switch',
                }}
              />
              <Typography>Dark</Typography>
            </Stack>
          </Section>
        </Box>
      </ScrollContainer>
    </MainPaper>
  );
}
