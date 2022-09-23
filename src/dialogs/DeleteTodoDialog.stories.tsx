import { type ComponentMeta, type ComponentStory } from '@storybook/react';

import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { UserContextDecorator } from '@sb/decorators/UserContextDecorator';
import { NotificationContextWrapper } from '@/context/notification';
import { DeleteTodoDialog } from '@/dialogs/DeleteTodoDialog';

export default {
  title: 'Dialogs/DeleteTodoDialog',
  component: DeleteTodoDialog,
  decorators: [UserContextDecorator],
  argTypes: {
    onDelete: { action: true },
  },
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof DeleteTodoDialog>;

const Template: ComponentStory<typeof DeleteTodoDialog> = (args) => (
  <NotificationContextWrapper>
    <DeleteTodoDialog {...args} />
  </NotificationContextWrapper>
);

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Delete todo/);
    expect(popoverTitle).not.toBeNull();
  });

  const modal = canvas.getByText(/Cancel/);
  await userEvent.click(modal);

  await waitForElementToBeRemoved(popoverTitle);
};

export const DeleteTodo = Template.bind({});
DeleteTodo.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Delete todo/);
    expect(popoverTitle).not.toBeNull();
  });

  const deleteButton = canvas.getByText(/Delete/, { selector: 'button' });
  await userEvent.click(deleteButton);

  await expect(args.onDelete).toHaveBeenCalled();
  await waitForElementToBeRemoved(popoverTitle);
};
