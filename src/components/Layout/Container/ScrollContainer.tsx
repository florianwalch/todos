import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Container for scroll content
 */
export const ScrollContainer = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  overflowX: 'hidden',
  margin: 0,
  padding: 0,

  [theme.breakpoints.up('md')]: {
    padding: `0 ${theme.spacing(4)}`,
    margin: `0 -${theme.spacing(4)}`,
  },
}));
