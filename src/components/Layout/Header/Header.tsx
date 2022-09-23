import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { useUserContext } from '@/context/user';

// type of component props
type HeaderProps = {
  onDrawerToggle: () => void;
};

/**
 * Header component of application.
 *
 * Provides toggle button to open sidebar navigation on the left &
 * username and sign out button on the right.
 *
 * @param {HeaderProps} props - component props
 */
export function Header({ onDrawerToggle }: HeaderProps) {
  const { user, signOut } = useUserContext();

  const userName = user?.username || /* istanbul ignore next */ '';

  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar + 1,
      })}>
      <Toolbar>
        <Grid
          container
          alignItems="center"
          sx={{
            margin: '0 auto',
            width: '100%',
            maxWidth: 900,
            px: 5,
          }}>
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              data-testid="toggle-button"
              onClick={onDrawerToggle}
              edge="start">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />

          <Grid item>
            <Typography variant="h6" noWrap>
              {userName}
            </Typography>
          </Grid>
          <Grid item sx={{ ml: 2 }} color="common.white">
            <IconButton
              onClick={signOut}
              color="inherit"
              data-testid="signOut-button">
              <LogoutRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
