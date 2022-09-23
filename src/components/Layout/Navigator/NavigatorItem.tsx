import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledLink } from '@/components/Navigation/Link';

// Styles for navigator items
const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  flexGrow: 0,
  color: theme.palette.text.primary,

  transition: theme.transitions.create(['background-color', 'color']),

  '&:hover, &.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  '&.Mui-disabled': {
    opacity: 1,
  },

  '&:last-child': {
    marginTop: 'auto',
  },

  '&.hasBorder': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

// type of component props
type NavigatorItemProps = {
  icon: JSX.Element;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  hasBorder?: boolean;
  href?: string;
};

/**
 * Item component of navigator.
 * @see Navigator
 *
 * @param {NavigatorItemProps} props - component props
 */
export function NavigatorItem({
  icon,
  label,
  isActive = false,
  onClick,
  hasBorder = false,
  href,
}: NavigatorItemProps) {
  // create base item
  const item = (
    <StyledListItem
      className={hasBorder ? 'hasBorder' : ''}
      onClick={onClick}
      selected={isActive}
      disabled={isActive}>
      <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </StyledListItem>
  );

  // if no href is set, return base item
  if (href == null) {
    return item;
  }

  // otherwise wrap in link component
  return <StyledLink to={href}>{item}</StyledLink>;
}
