import { type DrawerProps, Drawer, List } from '@mui/material';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { useUserContext } from '@/context/user';
import { NavigatorItem } from '@/components/Layout/Navigator/NavigatorItem';

// type of component props
type NavigatorProps = DrawerProps & {
  activePathName: string;
};

/**
 * Apps navigation menu.
 *
 * @param {NavigatorProps} componentProps - component props
 */
export function Navigator({ activePathName, ...props }: NavigatorProps) {
  const { signOut } = useUserContext();

  return (
    <Drawer variant="permanent" {...props}>
      <List
        disablePadding
        sx={{
          mt: '64px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <NavigatorItem
          icon={<PlaylistAddCheckRoundedIcon />}
          label="Todos"
          href="/"
          isActive={activePathName === '/'}
        />

        <NavigatorItem
          icon={<SettingsRoundedIcon />}
          label="Settings"
          href="/settings"
          isActive={activePathName === '/settings'}
        />

        <NavigatorItem
          icon={<PersonRoundedIcon />}
          label="Account"
          href="/account"
          isActive={activePathName === '/account'}
          hasBorder={true}
        />

        <NavigatorItem
          icon={<LogoutRoundedIcon />}
          label="Logout"
          onClick={() => signOut && signOut()}
        />
      </List>
    </Drawer>
  );
}
