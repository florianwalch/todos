import { Box, Link, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styled link to use as link icon in footer.
 */
const FooterIconLink = styled(Link, {
  shouldForwardProp(propName) {
    return propName !== 'icon';
  },
})<{ icon: string }>(({ theme, icon }) => ({
  width: 20,
  height: 20,
  margin: `0 ${theme.spacing(2)}`,
  background: `url(${icon})`,
  backgroundSize: '100%',
}));

/**
 * Footer component
 */
export function Footer() {
  const {
    palette: { mode },
  } = useTheme();

  const gitHubIconPath =
    mode === 'dark'
      ? '/static/GitHub-Mark-Light-120px-plus.png'
      : '/static/GitHub-Mark-120px-plus.png';

  const storybookIconPath =
    mode === 'dark'
      ? '/static/icon-storybook-inverse.svg'
      : '/static/icon-storybook-monochrome.svg';

  return (
    <Box
      component="footer"
      p={2}
      mb={4}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <FooterIconLink
        href="https://github.com/florianwalch/todos"
        target="_blank"
        icon={gitHubIconPath}
      />
      <FooterIconLink
        href="https://todos.florianwalch.de/storybook/index.html"
        target="_blank"
        icon={storybookIconPath}
      />
    </Box>
  );
}
