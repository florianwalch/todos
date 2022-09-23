import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

// add default style to RR Link component
export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
}));
