import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

/**
 * Root component of each view.
 */
export const MainPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '100%',
  padding: `${theme.spacing(5)} 0`,

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10),
  },
}));
