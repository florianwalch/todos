import { AppBar, type AppBarProps, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

// style root container
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  paddingBottom: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

/**
 * App/toolbar for view specific actions.
 *
 * @param {AppBarProps} componentProps - component props
 */
export function ViewBar({ children, ...props }: AppBarProps) {
  return (
    <StyledAppBar position="static" {...props}>
      <Toolbar
        sx={{
          minHeight: '32px !important',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'normal',
        }}>
        {children}
      </Toolbar>
    </StyledAppBar>
  );
}
