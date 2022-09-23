import { useEffect, useState, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Footer } from '@/components/Layout/Footer/Footer';
import { Header } from '@/components/Layout/Header/Header';
import { Navigator } from '@/components/Layout/Navigator/Navigator';
import { Loader } from '@/components/Loader/Loader';

const drawerWidth = 250;

// Styled box for main content
const Main = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  flex: 1,
  overflow: 'hidden',
  margin: `${theme.spacing(5)} auto`,
  padding: `${theme.spacing(2)} 0`,

  [theme.breakpoints.up('md')]: {
    margin: `${theme.spacing(10)} auto`,
    padding: `${theme.spacing(5)} ${theme.spacing(2)}`,
  },
}));

/**
 * Layout component used by views.
 *
 * Includes header, sidebar navigation, footer & main content
 */
export function Layout() {
  const { pathname } = useLocation();
  const [navigationIsOpen, setNavigationIsOpen] = useState(false);

  // open/close sidebar navigation
  const handleDrawerToggle = () => {
    setNavigationIsOpen((state) => !state);
  };

  // close sidebar after route change
  useEffect(() => {
    setNavigationIsOpen(false);
  }, [pathname]);

  return (
    <Box display="flex" height="100%">
      <Box component="nav">
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          variant="temporary"
          activePathName={pathname}
          open={navigationIsOpen}
          onClose={handleDrawerToggle}
        />
      </Box>

      <Box display="flex" flexDirection="column" flex={1} width="100%">
        <Header onDrawerToggle={handleDrawerToggle} />

        <Main component="main">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Main>

        <Footer />
      </Box>
    </Box>
  );
}
