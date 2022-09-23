import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { expect } from '@storybook/jest';
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';

import {
  mockedUserAPI,
  UserContextDecorator,
} from '@sb/decorators/UserContextDecorator';
import { ChangePasswordDialog } from '@/dialogs/ChangePasswordDialog';
import { NotificationContextWrapper } from '@/context/notification';

export default {
  title: 'Dialogs/ChangePasswordDialog',
  component: ChangePasswordDialog,
  decorators: [UserContextDecorator],
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof ChangePasswordDialog>;

const Template: ComponentStory<typeof ChangePasswordDialog> = () => (
  <NotificationContextWrapper>
    <ChangePasswordDialog />
  </NotificationContextWrapper>
);

export const Cancel = Template.bind({});
Cancel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByText(/Change password/);
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Here you can/);
  });
  expect(popoverTitle).not.toBeNull();

  const cancelButton = canvas.getByText(/Cancel/);
  await userEvent.click(cancelButton);

  await waitForElementToBeRemoved(popoverTitle);
};

export const ChangePassword = Template.bind({});
ChangePassword.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  mockedUserAPI.updatePassword.mockResolvedValueOnce(undefined);

  const button = canvas.getByText(/Change password/);
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Here you can/);
  });
  expect(popoverTitle).not.toBeNull();

  const oldPassword = canvas.getByLabelText('Old password', {
    selector: 'input',
  });
  await userEvent.type(oldPassword, '1234', { delay: 100 });

  const newPassword = canvas.getByLabelText('New password', {
    selector: 'input',
  });
  await userEvent.type(newPassword, '12345', { delay: 100 });

  const confirmPassword = canvas.getByLabelText('Confirm password', {
    selector: 'input',
  });
  await userEvent.type(confirmPassword, '12345', { delay: 100 });

  const changeButton = canvas.getByText(/Change/, {
    selector: 'button[type=submit]',
  });
  await userEvent.click(changeButton);

  await waitForElementToBeRemoved(popoverTitle);

  const notification = await canvas.getByText(/Password has been changed./);
  expect(notification).not.toBeNull();
  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};
