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

import { NotificationContextWrapper } from '@/context/notification';
import { DeleteAccountDialog } from '@/dialogs/DeleteAccountDialog';

export default {
  title: 'Dialogs/DeleteAccountDialog',
  component: DeleteAccountDialog,
  decorators: [UserContextDecorator],
  argTypes: {
    onDelete: { action: true },
    deleteAccount: { action: true },
  },
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof DeleteAccountDialog>;

const Template: ComponentStory<typeof DeleteAccountDialog> = () => (
  <NotificationContextWrapper>
    <DeleteAccountDialog />
  </NotificationContextWrapper>
);

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
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

  const cancelButton = canvas.getByText(/Cancel/);
  await userEvent.click(cancelButton);

  await waitForElementToBeRemoved(popoverTitle);
};

export const Delete = Template.bind({});
Delete.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  mockedUserAPI.deleteUser.mockResolvedValueOnce(undefined);

  const button = canvas.getByText(/Delete Account/);
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(
      /Do you really want to delete your account?/,
    );
  });

  const deleteButton = canvas.getByText('Delete', { selector: 'button' });
  await userEvent.click(deleteButton);

  await waitForElementToBeRemoved(popoverTitle);

  const notification = await canvas.getByText(/Account has been deleted./);
  expect(notification).not.toBeNull();
  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};

export const DeleteWithError = Template.bind({});
DeleteWithError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  mockedUserAPI.deleteUser.mockRejectedValueOnce('Unable to delete account.');

  const button = canvas.getByText(/Delete Account/);
  await userEvent.click(button);

  await canvas.findByText(/Do you really want to delete your account?/);

  const deleteButton = canvas.getByText('Delete', { selector: 'button' });
  await userEvent.click(deleteButton);

  await waitFor(async () => {
    await canvas.findByText(/Unable to delete account/);
  });
};
