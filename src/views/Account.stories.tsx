import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { UserContextDecorator } from '@sb/decorators/UserContextDecorator';

import { NotificationContextWrapper } from '@/context/notification';
import { AccountView } from '@/views/Account';

export default {
  title: 'Views/AccountView',
  component: AccountView,
  decorators: [UserContextDecorator],
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof AccountView>;

const Template: ComponentStory<typeof AccountView> = () => (
  <NotificationContextWrapper>
    <MemoryRouter initialEntries={['/account']}>
      <Routes>
        <Route path="/account" element={<AccountView />} />
      </Routes>
    </MemoryRouter>
  </NotificationContextWrapper>
);

export const Default = Template.bind({});

export const ChangePassword = Template.bind({});
ChangePassword.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByText(/Change password/, { selector: 'button' });

  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Here you can/);
  });
  expect(popoverTitle).not.toBeNull();
};

export const DeleteAccount = Template.bind({});
DeleteAccount.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByText(/Delete Account/);
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(
      /Do you really want to delete your account?/,
    );
  });

  expect(popoverTitle).not.toBeNull();
};
