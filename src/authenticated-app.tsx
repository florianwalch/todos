import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotificationContextWrapper } from '@/context/notification';
import { ThemeContextWrapper } from '@/context/theme';
import {
  UserContextWrapper,
  type UserContextWrapperProps,
} from '@/context/user';

import { Layout } from '@/views/Layout';

const MainView = lazy(async () => ({
  default: (await import(/* webpackChunkName: "MainView" */ '@/views/MainView'))
    .MainView,
}));

const TodoView = lazy(async () => ({
  default: (await import(/* webpackChunkName: "TodoView" */ '@/views/TodoView'))
    .TodoView,
}));

const SettingsView = lazy(async () => ({
  default: (
    await import(/* webpackChunkName: "SettingsView" */ '@/views/Settings')
  ).SettingsView,
}));

const AccountView = lazy(async () => ({
  default: (
    await import(/* webpackChunkName: "AccountView" */ '@/views/Account')
  ).AccountView,
}));

type AuthenticatedAppProps = {
  user: UserContextWrapperProps['user'];
  signOut: UserContextWrapperProps['signOut'];
};

export function AuthenticatedApp({ user, signOut }: AuthenticatedAppProps) {
  return (
    <ThemeContextWrapper>
      <UserContextWrapper user={user} signOut={signOut}>
        <NotificationContextWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainView />} />
                <Route path="todo/:todoId" element={<TodoView />} />

                <Route path="settings" element={<SettingsView />} />
                <Route path="account" element={<AccountView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NotificationContextWrapper>
      </UserContextWrapper>
    </ThemeContextWrapper>
  );
}
