import { useEffect } from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { jest, expect } from '@storybook/jest';
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';

import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { NotificationContextWrapper } from '@/context/notification';
import { MainView } from '@/views/MainView';
import { TodoAPI } from '@/api/todo';
import { ModelSortDirection, type Todo } from '@/API';

const mockTodos = [
  { id: '1', title: 'Test todo', message: '' } as Todo,
  { id: '2', title: 'Another test todo', message: '' } as Todo,
  { id: '3', title: 'Last test', message: '' } as Todo,
];

let mockedTodoAPI: jest.Mocked<typeof TodoAPI>;

function mockSetup() {
  mockedTodoAPI = jest.mocked(TodoAPI) as jest.Mocked<typeof TodoAPI>;
  mockedTodoAPI.fetchTodo = jest.fn() as jest.MockedFunction<
    typeof TodoAPI.fetchTodo
  >;

  mockedTodoAPI.fetchTodos = jest.fn() as jest.MockedFunction<
    typeof TodoAPI.fetchTodos
  >;
  mockedTodoAPI.updateTodo = jest.fn() as jest.MockedFunction<
    typeof TodoAPI.updateTodo
  >;
  mockedTodoAPI.deleteTodo = jest.fn() as jest.MockedFunction<
    typeof TodoAPI.deleteTodo
  >;
  mockedTodoAPI.createTodo = jest.fn() as jest.MockedFunction<
    typeof TodoAPI.createTodo
  >;

  mockedTodoAPI.fetchTodos.mockResolvedValue(mockTodos);
  mockedTodoAPI.deleteTodo.mockResolvedValue();
  mockedTodoAPI.createTodo.mockImplementation((todo) =>
    Promise.resolve(todo as Todo),
  );
  mockedTodoAPI.updateTodo.mockImplementation((todo) =>
    Promise.resolve(todo as Todo),
  );
}

let testLocation: string | null = null;
function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    testLocation = location.pathname;
  }, [location]);

  return <Outlet />;
}

export default {
  title: 'Views/MainView',
  component: MainView,
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof MainView>;

const Template: ComponentStory<typeof MainView> = () => {
  mockSetup();

  return (
    <NotificationContextWrapper>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<RouteLogger />}>
            <Route index element={<MainView />} />
            <Route path="todo/:todoId" element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </NotificationContextWrapper>
  );
};

export const Default = Template.bind({});

export const ShowHideFilter = Template.bind({});
ShowHideFilter.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const filterSwitch = canvas.getByLabelText(/Filter/);
  await userEvent.click(filterSwitch);

  const dateSortSwitch = canvas.getByLabelText(/Newest first/);
  const onlyDueCheckbox = canvas.getByLabelText(/Only due/);
  const includeDoneCheckbox = canvas.getByLabelText(/Include done todos/);

  expect(dateSortSwitch).not.toBeNull();
  expect(onlyDueCheckbox).not.toBeNull();
  expect(includeDoneCheckbox).not.toBeNull();

  await userEvent.click(filterSwitch);

  await waitForElementToBeRemoved(dateSortSwitch, { timeout: 2000 });
  await expect(canvas.queryByLabelText(/Newest first/)).toBeNull();
  await expect(canvas.queryByLabelText(/Only due/)).toBeNull();
  await expect(canvas.queryByLabelText(/Include done todos/)).toBeNull();
};

export const FilterByDate = Template.bind({});
FilterByDate.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const filterSwitch = canvas.getByLabelText(/Filter/);
  await userEvent.click(filterSwitch);

  const dateSortSwitch = canvas.getByLabelText(/Newest first/);
  await userEvent.click(dateSortSwitch);

  await expect(mockedTodoAPI.fetchTodos).toBeCalledWith(
    {
      isDone: { eq: false },
    },
    ModelSortDirection.ASC,
  );

  await userEvent.click(dateSortSwitch);
  await expect(mockedTodoAPI.fetchTodos).toBeCalledWith(
    {
      isDone: { eq: false },
    },
    ModelSortDirection.DESC,
  );
};

export const FilterByDone = Template.bind({});
FilterByDone.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const filterSwitch = canvas.getByLabelText(/Filter/);
  await userEvent.click(filterSwitch);

  const includeDoneCheckbox = canvas.getByLabelText(/Include done todos/);
  await userEvent.click(includeDoneCheckbox);

  await expect(mockedTodoAPI.fetchTodos).toBeCalledWith(
    null,
    ModelSortDirection.DESC,
  );

  await userEvent.click(includeDoneCheckbox);
  await expect(mockedTodoAPI.fetchTodos).toBeCalledWith(
    {
      isDone: { eq: false },
    },
    ModelSortDirection.DESC,
  );
};

export const FilterByDue = Template.bind({});
FilterByDue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const filterSwitch = canvas.getByLabelText(/Filter/);
  await userEvent.click(filterSwitch);

  const includeDoneCheckbox = canvas.getByLabelText(/Only due/);
  await userEvent.click(includeDoneCheckbox);

  await expect(mockedTodoAPI.fetchTodos).toBeCalledWith(
    {
      isDone: { eq: false },
      dueDate: expect.objectContaining({
        lt: expect.stringMatching(
          /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        ),
      }),
    },
    ModelSortDirection.DESC,
  );

  await userEvent.click(includeDoneCheckbox);
  await expect(mockedTodoAPI.fetchTodos).toBeCalledWith(
    {
      isDone: { eq: false },
    },
    ModelSortDirection.DESC,
  );
};

export const MarkAsDone = Template.bind({});
MarkAsDone.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const markAsDoneButtons = await canvas.findAllByTestId('mark-as-done-button');
  await userEvent.click(markAsDoneButtons[0]);

  await expect(mockedTodoAPI.updateTodo).toHaveBeenCalledWith({
    id: mockTodos[0].id,
    isDone: true,
  });

  await expect(mockedTodoAPI.fetchTodos).toHaveBeenCalledTimes(2);

  const notification = await canvas.findByText(/Todo has been updated./);
  expect(notification).not.toBeNull();
  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};

export const DeleteTodo = Template.bind({});
DeleteTodo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const deleteButtons = await canvas.findAllByTestId('delete-button');
  await userEvent.click(deleteButtons[0]);

  const deleteButton = canvas.getByText(/Delete/, { selector: 'button' });
  await userEvent.click(deleteButton);

  await expect(mockedTodoAPI.deleteTodo).toHaveBeenCalledWith(mockTodos[0]);
  await expect(mockedTodoAPI.fetchTodos).toHaveBeenCalledTimes(2);

  const notification = await canvas.findByText(/Todo has been deleted./);
  expect(notification).not.toBeNull();
  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};

export const CreateTodo = Template.bind({});
CreateTodo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const addButton = await canvas.findByTestId('create-todo-button');
  await userEvent.click(addButton);

  const popover = await canvas.findByText(/Create a new todo/);

  const titleInput = canvas.getByLabelText('Title', {
    selector: 'input',
  });
  await userEvent.type(titleInput, 'Test title', { delay: 100 });

  const contentInput = canvas.getByLabelText('Content', {
    selector: 'textarea',
  });
  await userEvent.type(contentInput, 'Test content', { delay: 100 });

  const saveButton = canvas.getByText(/Save/);
  await userEvent.click(saveButton);

  await waitForElementToBeRemoved(popover);

  await expect(mockedTodoAPI.fetchTodos).toHaveBeenCalledTimes(2);
  await expect(mockedTodoAPI.createTodo).toHaveBeenCalledWith({
    title: 'Test title',
    message: 'Test content',
    dueDate: null,
    id: undefined,
    isDone: false,
  });

  const notification = await canvas.getByText(/Todo has been created./);
  expect(notification).not.toBeNull();
  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};

export const SearchTodo = Template.bind({});
SearchTodo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByPlaceholderText(/Search/);
  await userEvent.type(input, 'Another', { delay: 100 });

  const todoItem = await canvas.findByText(/Another test todo/);
  const notInSearchResult = await canvas.queryAllByText(/Last test/);

  expect(todoItem).not.toBeNull();
  await expect(notInSearchResult.length).toBe(0);
};

export const ClickTodo = Template.bind({});
ClickTodo.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const todo = await canvas.findByText(/Another test todo/);
  await userEvent.click(todo);

  await expect(testLocation).toBe('/todo/2');
};

export const Loader = Template.bind({});
Loader.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  mockedTodoAPI.fetchTodos.mockImplementation(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTodos);
      }, 1000);
    });
  });

  await waitFor(
    async () => {
      const markAsDoneButtons = await canvas.findAllByTestId(
        'mark-as-done-button',
      );
      await userEvent.click(markAsDoneButtons[0]);
    },
    { timeout: 2000 },
  );

  const loader = await canvas.findByTestId('loader');
  await waitForElementToBeRemoved(loader, { timeout: 2000 });
};
