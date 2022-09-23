import { Backdrop, CircularProgress } from '@mui/material';

/**
 * Loader component to indicate pending
 * network tasks.
 */
export function Loader() {
  return (
    <Backdrop
      data-testid="loader"
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
