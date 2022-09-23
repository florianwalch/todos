import { MemoryRouter } from 'react-router-dom';

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TodosList } from '@/components/TodosList/TodosList';
import { TodosListItem } from '@/components/TodosList/TodosListItem';
import { TodoListSkeleton } from '@/components/TodosList/TodoListSkeleton';

export default {
  title: 'Components/Lists/TodoList',
  component: TodosList,
  subcomponents: { TodoListSkeleton, TodosListItem },
  parameters: {
    docs: {
      source: {
        code: `<TodosList todos={[...]} />`,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
} as ComponentMeta<typeof TodosList>;

const defaultTodo = {
  __typename: 'Todo' as const,
  id: '1',
  title: 'Write a story',
  isDone: false,
  message: 'This is a test message',
  createdAt: '',
  type: 'TODO',
  updatedAt: '',
};

const dueTodo = {
  __typename: 'Todo' as const,
  id: '2',
  dueDate: '2022-08-02T22:00:00.000Z',
  title: 'Write some tests',
  isDone: false,
  message: 'This is a test message',
  createdAt: '',
  type: 'TODO',
  updatedAt: '',
};

const doneTodo = {
  __typename: 'Todo' as const,
  id: '3',
  title: 'Write more documentation',
  isDone: true,
  message: 'This is a test message',
  createdAt: '',
  type: 'TODO',
  updatedAt: '',
};

const Template: ComponentStory<typeof TodosList> = (args) => (
  <MemoryRouter>
    <TodosList {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  todos: [defaultTodo, dueTodo, doneTodo],
};

export const DoneTodo = Template.bind({});
DoneTodo.args = {
  todos: [doneTodo],
};

export const DueTodo = Template.bind({});
DueTodo.args = {
  todos: [dueTodo],
};

export const LoadingList = Template.bind({});
LoadingList.args = {
  todos: null,
};

export const MarkAsDone = Template.bind({});
MarkAsDone.args = {
  todos: [defaultTodo],
};
MarkAsDone.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByTestId('mark-as-done-button');
  await userEvent.click(button);

  await expect(args.onMarkAsDone).toBeCalledWith(defaultTodo);
};

export const DeleteTodo = Template.bind({});
DeleteTodo.args = {
  todos: [defaultTodo],
};
DeleteTodo.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByTestId('delete-button');
  await userEvent.click(button);

  const deleteButton = canvas.getByText(/Delete/, { selector: 'button' });
  await userEvent.click(deleteButton);

  await expect(args.onDelete).toBeCalledWith(defaultTodo);
};
