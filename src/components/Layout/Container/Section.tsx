import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSection = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(5)} 0`,
  padding: `${theme.spacing(5)} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * Section component.
 *
 * @param {BoxProps} props - box component props
 */
export function Section(props: BoxProps) {
  return <StyledSection component="section" {...props} />;
}
