import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { expect } from '@storybook/jest';

import { TodoForm } from '@/forms/TodoForm/TodoForm';
import { userEvent, waitFor, within } from '@storybook/testing-library';

export default {
  title: 'Forms/TodoForm',
  component: TodoForm,
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
} as ComponentMeta<typeof TodoForm>;

const defaultTodo = {
  id: '1',
  title: '',
  message: '',
  isDone: false,
  dueDate: null,
};

const Template: ComponentStory<typeof TodoForm> = (args) => (
  <TodoForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  todo: defaultTodo,
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const titleInput = canvas.getByLabelText('Title', {
    selector: 'input',
  });

  const contentInput = canvas.getByLabelText('Content', {
    selector: 'textarea',
  });

  const dateInput = canvas.getByLabelText('Due date', {
    selector: 'input',
  });

  await userEvent.type(titleInput, 'Test title', { delay: 100 });
  await userEvent.type(contentInput, 'Test content', { delay: 100 });
  await userEvent.type(dateInput, '2022-10-07', { delay: 100 });

  const isDoneInput = canvas.getByLabelText(/Mark as done/);
  await userEvent.click(isDoneInput);

  const submitButton = canvas.getByText('Save', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);
  await waitFor(() =>
    expect(args.onSubmit).toHaveBeenCalledWith({
      ...defaultTodo,
      title: 'Test title',
      message: 'Test content',
      isDone: true,
      dueDate: '2022-10-06T22:00:00.000Z',
    }),
  );
};

export const TitleIsMissing = Template.bind({});
TitleIsMissing.args = {
  todo: defaultTodo,
};
TitleIsMissing.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const isDoneInput = canvas.getByLabelText(/Mark as done/);
  await userEvent.click(isDoneInput);

  const submitButton = canvas.getByText('Save', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);

  const errorMessage = await canvas.findByText(/Title is required/i);
  expect(errorMessage).not.toBeNull();
  expect(args.onSubmit).not.toHaveBeenCalled();
};

export const ContentIsMissing = Template.bind({});
ContentIsMissing.args = {
  todo: defaultTodo,
};
ContentIsMissing.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const titleInput = canvas.getByLabelText('Title', {
    selector: 'input',
  });
  await userEvent.type(titleInput, 'Test title', { delay: 100 });

  const submitButton = canvas.getByText('Save', {
    selector: '[type=submit]',
  });

  await userEvent.click(submitButton);

  const errorMessage = await canvas.findByText(/Content is required/i);
  expect(errorMessage).not.toBeNull();
  expect(args.onSubmit).not.toHaveBeenCalled();
};

export const CancelAction = Template.bind({});
CancelAction.args = {
  todo: defaultTodo,
};
CancelAction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const titleInput = canvas.getByLabelText('Title', {
    selector: 'input',
  });

  const contentInput = canvas.getByLabelText('Content', {
    selector: 'textarea',
  });

  await userEvent.type(titleInput, 'Test title', { delay: 100 });
  await userEvent.type(contentInput, 'Test content', { delay: 100 });

  const cancelButton = canvas.getByText('Cancel');
  await userEvent.click(cancelButton);

  await expect((titleInput as HTMLInputElement).value).toBe('');
  await expect((contentInput as HTMLInputElement).value).toBe('');
};

export const FormError = Template.bind({});
FormError.args = {
  todo: defaultTodo,
  formError: 'Saving todo failed',
};
FormError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const errorMessage = await canvas.findByText(/Saving todo failed/);

  expect(errorMessage).not.toBeNull();
};
