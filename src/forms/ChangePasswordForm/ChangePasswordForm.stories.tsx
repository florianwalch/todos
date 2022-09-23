import { type ComponentMeta, type ComponentStory } from '@storybook/react';

import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ChangePasswordForm } from '@/forms/ChangePasswordForm/ChangePasswordForm';

export default {
  title: 'Forms/ChangePasswordForm',
  component: ChangePasswordForm,
  argTypes: {
    onSubmit: { action: true },
    onCancel: { action: true },
  },
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof ChangePasswordForm>;

const Template: ComponentStory<typeof ChangePasswordForm> = (args) => (
  <ChangePasswordForm {...args} />
);

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const oldPassword = canvas.getByLabelText('Old password', {
    selector: 'input',
  });

  const newPassword = canvas.getByLabelText('New password', {
    selector: 'input',
  });

  const confirmPassword = canvas.getByLabelText('Confirm password', {
    selector: 'input',
  });

  await userEvent.type(oldPassword, '1234', { delay: 100 });
  await userEvent.type(newPassword, '12345', { delay: 100 });
  await userEvent.type(confirmPassword, '12345', { delay: 100 });
};

export const CancelAction = Template.bind({});
CancelAction.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const submitButton = canvas.getByText('Cancel');

  await userEvent.click(submitButton);
  await expect(args.onCancel).toHaveBeenCalled();
};

export const OldPasswordMissing = Template.bind({});
OldPasswordMissing.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const newPassword = canvas.getByLabelText('New password', {
    selector: 'input',
  });

  await userEvent.type(newPassword, '12345', { delay: 100 });

  const submitButton = canvas.getByText('Change password', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);

  const errorMessage = await canvas.findByText(/Old password is required/i);
  expect(errorMessage).not.toBeNull();
  expect(args.onSubmit).not.toHaveBeenCalled();
};

export const NewPasswordMissing = Template.bind({});
NewPasswordMissing.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const newPassword = canvas.getByLabelText('Old password', {
    selector: 'input',
  });

  await userEvent.type(newPassword, '12345', { delay: 100 });

  const submitButton = canvas.getByText('Change password', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);

  const errorMessage = await canvas.findByText(/New password is required/i);
  expect(errorMessage).not.toBeNull();
  expect(args.onSubmit).not.toHaveBeenCalled();
};

export const ConfirmPasswordMissing = Template.bind({});
ConfirmPasswordMissing.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const oldPassword = canvas.getByLabelText('Old password', {
    selector: 'input',
  });

  const newPassword = canvas.getByLabelText('New password', {
    selector: 'input',
  });

  await userEvent.type(oldPassword, '1234', { delay: 100 });
  await userEvent.type(newPassword, '12345', { delay: 100 });

  const submitButton = canvas.getByText('Change password', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);

  const errorMessage = await canvas.findByText(/Confirm your new password/i);
  expect(errorMessage).not.toBeNull();
  expect(args.onSubmit).not.toHaveBeenCalled();
};

export const PasswordMissMatch = Template.bind({});
PasswordMissMatch.play = async (context) => {
  await Default.play?.(context);

  const { args, canvasElement } = context;
  const canvas = within(canvasElement);

  const confirmPassword = canvas.getByLabelText('Confirm password', {
    selector: 'input',
  });

  await userEvent.type(confirmPassword, '123456', { delay: 100 });

  const submitButton = canvas.getByText('Change password', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);

  const errorMessage = await canvas.findByText(/Password does not match/i);
  expect(errorMessage).not.toBeNull();
  expect(args.onSubmit).not.toHaveBeenCalled();
};

export const PasswordChange = Template.bind({});
PasswordChange.play = async (context) => {
  await Default.play?.(context);

  const { args, canvasElement } = context;

  const canvas = within(canvasElement);

  const submitButton = canvas.getByText('Change password', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);
  await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
};

export const FormError = Template.bind({});
FormError.args = {
  formError: 'Password change failed',
};
FormError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const errorMessage = await canvas.findByText(/Password change failed/);
  expect(errorMessage).not.toBeNull();
};
