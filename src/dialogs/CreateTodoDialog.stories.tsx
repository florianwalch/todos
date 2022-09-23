import { type ComponentMeta, type ComponentStory } from '@storybook/react';

import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { UserContextDecorator } from '@sb/decorators/UserContextDecorator';
import { NotificationContextWrapper } from '@/context/notification';
import { CreateTodoDialog } from '@/dialogs/CreateTodoDialog';
import { TodoAPI } from '@/api/todo';
import { type Todo } from '@/API';

const createTodo = (todo: Todo): Promise<Todo> => {
  return Promise.resolve(todo);
};

const mockedTodoAPI = jest.mocked(TodoAPI, true) as jest.Mocked<typeof TodoAPI>;
mockedTodoAPI.createTodo = jest.fn(createTodo) as jest.MockedFunction<
  typeof TodoAPI.createTodo
>;

export default {
  title: 'Dialogs/CreateTodoDialog',
  component: CreateTodoDialog,
  decorators: [UserContextDecorator],
  argTypes: {
    onTodoCreate: { action: true },
  },
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof CreateTodoDialog>;

const Template: ComponentStory<typeof CreateTodoDialog> = (args) => (
  <NotificationContextWrapper>
    <CreateTodoDialog {...args} />
  </NotificationContextWrapper>
);

export const Cancel = Template.bind({});
Cancel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Create a new todo/);
    expect(popoverTitle).not.toBeNull();
  });

  const cancelButton = canvas.getByText(/Cancel/);
  await userEvent.click(cancelButton);

  await waitForElementToBeRemoved(popoverTitle);
};

export const CreateTodo = Template.bind({});
CreateTodo.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByRole('button');
  await userEvent.click(button);

  let popoverTitle;
  await waitFor(async () => {
    popoverTitle = await canvas.findByText(/Create a new todo/);
  });
  expect(popoverTitle).not.toBeNull();

  const titleInput = canvas.getByLabelText('Title', {
    selector: 'input',
  });

  const contentInput = canvas.getByLabelText('Content', {
    selector: 'textarea',
  });

  await userEvent.type(titleInput, 'Test title', { delay: 100 });
  await userEvent.type(contentInput, 'Test content', { delay: 100 });

  const saveButton = canvas.getByText(/Save/);
  await userEvent.click(saveButton);

  await waitForElementToBeRemoved(popoverTitle);
  await expect(args.onTodoCreate).toHaveBeenCalled();

  const notification = await canvas.getByText(/Todo has been created./);
  expect(notification).not.toBeNull();
  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};
