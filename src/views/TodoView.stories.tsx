import { useEffect } from 'react';
import {
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { jest, expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { type Todo } from '@/API';
import { TodoAPI } from '@/api/todo';
import { TodoView } from '@/views/TodoView';
import { NotificationContextWrapper } from '@/context/notification';

let mockedTodoAPI: jest.Mocked<typeof TodoAPI>;

function mockSetup() {
  mockedTodoAPI = jest.mocked(TodoAPI) as jest.Mocked<typeof TodoAPI>;
  mockedTodoAPI.fetchTodo = jest.fn() as jest.MockedFunction<
    typeof TodoAPI.fetchTodo
  >;

  mockedTodoAPI.fetchTodo.mockImplementation(() =>
    Promise.resolve({ id: '1' } as Todo),
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
  title: 'Views/TodoView',
  component: TodoView,
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof TodoView>;

const Template: ComponentStory<typeof TodoView> = () => {
  mockSetup();
  return (
    <NotificationContextWrapper>
      <MemoryRouter initialEntries={['/todo/1']}>
        <Routes>
          <Route path="/" element={<RouteLogger />}>
            <Route path="todo/:todoId" element={<TodoView />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </NotificationContextWrapper>
  );
};

export const Default = Template.bind({});

export const BackToList = Template.bind({});
BackToList.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByTestId('back-to-list-button');
  await userEvent.click(button);

  await expect(testLocation).toBe('/');
};
