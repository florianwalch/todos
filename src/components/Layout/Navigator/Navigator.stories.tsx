import { type ComponentProps, type ReactNode, useEffect } from 'react';
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { type ComponentMeta, type Story } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import {
  mockedSignOut,
  UserContextDecorator,
} from '@sb/decorators/UserContextDecorator';

import { Navigator } from '@/components/Layout/Navigator/Navigator';
import { NavigatorItem } from '@/components/Layout/Navigator/NavigatorItem';

let testLocation: string | null = null;
function RouteLogger({
  children,
}: {
  children: (currentPath: string) => ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    testLocation = location.pathname;
  }, [location]);

  return (
    <>
      <Outlet />
      {children(location.pathname)}
    </>
  );
}

export default {
  title: 'Components/Layout/Navigator',
  component: Navigator,
  subcomponents: { NavigatorItem },
  decorators: [UserContextDecorator],
  args: {
    initialRoute: '/',
  },
  parameters: {
    docs: {
      iframeHeight: 600,
      inlineStories: false,

      source: {
        code: `<Navigator
          PaperProps={{ style: { width: 256 } }}
          variant="temporary"
          open={navigationIsOpen}
          onClose={handleDrawerToggle}
          onNavigate={handleDrawerToggle}
        />`,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
} as ComponentMeta<typeof Navigator>;

type RouterProps = {
  initialRoute: string;
};

const Template: Story<ComponentProps<typeof Navigator> & RouterProps> = (
  args,
) => {
  const { initialRoute, ...props } = args;

  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route
          path="/"
          element={
            <RouteLogger>
              {(currentPath) => (
                <Navigator
                  PaperProps={{ style: { width: 256 } }}
                  {...props}
                  activePathName={currentPath}
                />
              )}
            </RouteLogger>
          }>
          <Route path="/account" element={<div />} />
          <Route path="/settings" element={<div />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export const Default = Template.bind({});

export const AccountLink = Template.bind({});
AccountLink.args = {
  initialRoute: '/settings',
};
AccountLink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const accountButton = await canvas.findByText(/Account/);

  // react router link only performs link to actions after first effect
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });

  await userEvent.click(accountButton);
  await expect(testLocation).toBe('/account');
};

export const SettingsLink = Template.bind({});
SettingsLink.args = {
  initialRoute: '/account',
};
SettingsLink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const settingsButton = await canvas.findByText(/Settings/);

  // react router link only performs link to actions after first effect
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });

  await userEvent.click(settingsButton);
  await expect(testLocation).toBe('/settings');
};

export const SignOut = Template.bind({});
SignOut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const signOutButton = canvas.getByText(/Logout/);
  await userEvent.click(signOutButton);
  await expect(mockedSignOut).toBeCalled();
};
