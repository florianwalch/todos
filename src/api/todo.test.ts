import { jest, describe, expect, test } from '@jest/globals';
import { API } from '@aws-amplify/api';

import { ModelSortDirection, type Todo } from '@/API';
import { TodoAPI } from '@/api/todo';

jest.mock('@aws-amplify/api');

const mockedGraphQL = API.graphql as jest.MockedFunction<typeof API.graphql>;

afterEach(() => {
  mockedGraphQL.mockClear();
});

describe('user api', () => {
  test('fetch of single todo', () => {
    expect.assertions(4);

    const mockTodo = { id: '1' };
    mockedGraphQL.mockResolvedValueOnce({ data: { getTodo: mockTodo } });
    TodoAPI.fetchTodo('1').then((todo) => {
      expect(todo).toEqual(mockTodo);
    });

    mockedGraphQL.mockResolvedValueOnce({});
    TodoAPI.fetchTodo('1').then((todo) => {
      expect(todo).toBe(null);
    });

    mockedGraphQL.mockResolvedValueOnce({ data: null });
    TodoAPI.fetchTodo('1').then((todo) => {
      expect(todo).toBe(null);
    });

    mockedGraphQL.mockResolvedValueOnce({ data: { getTodo: null } });
    TodoAPI.fetchTodo('1').then((todo) => {
      expect(todo).toBe(null);
    });
  });

  test('fetch list of todos', () => {
    expect.assertions(6);

    const mockTodo = { id: '1' };
    const mockListResult = {
      data: {
        getTodosByDate: {
          items: [mockTodo, null, { id: '2' }, { id: '3' }, undefined],
        },
      },
    };

    mockedGraphQL.mockResolvedValueOnce(mockListResult);
    TodoAPI.fetchTodos(null, ModelSortDirection.DESC).then((todos) => {
      // only 3 of them should be returned
      expect(todos.length).toBe(3);

      // all null values should have been filtered
      expect(todos.find((todo) => todo == null)).toBeUndefined();

      // our mocked one should be included in the result
      expect(todos.find((todo) => todo === mockTodo)).not.toBeNull();
    });

    mockedGraphQL.mockResolvedValueOnce({});
    TodoAPI.fetchTodos(null, ModelSortDirection.DESC).then((todos) => {
      expect(todos.length).toBe(0);
    });

    mockedGraphQL.mockResolvedValueOnce({ data: null });
    TodoAPI.fetchTodos(null, ModelSortDirection.DESC).then((todos) => {
      expect(todos.length).toBe(0);
    });

    mockedGraphQL.mockResolvedValueOnce({ data: { getTodosByDate: null } });
    TodoAPI.fetchTodos(null, ModelSortDirection.DESC).then((todos) => {
      expect(todos.length).toBe(0);
    });
  });

  test('create of todo', () => {
    expect.assertions(3);

    const mockTodo = { id: '1' };
    mockedGraphQL.mockResolvedValueOnce({ data: { createTodo: mockTodo } });
    TodoAPI.createTodo({ message: '' } as Todo).then((todo) => {
      expect(todo).toBe(mockTodo);
    });

    mockedGraphQL.mockResolvedValueOnce({});
    TodoAPI.createTodo({ message: '' } as Todo).catch((error) => {
      expect(error).toBe('Todo is missing in result');
    });

    mockedGraphQL.mockResolvedValueOnce({ data: null });
    TodoAPI.createTodo({ message: '' } as Todo).catch((error) => {
      expect(error).toBe('Todo is missing in result');
    });
  });

  test('update of todo', () => {
    expect.assertions(3);

    const mockTodo = { id: '1' };
    mockedGraphQL.mockResolvedValueOnce({ data: { updateTodo: mockTodo } });
    TodoAPI.updateTodo({ message: 'update' } as Todo).then((todo) => {
      expect(todo).toBe(mockTodo);
    });

    mockedGraphQL.mockResolvedValueOnce({});
    TodoAPI.updateTodo({ message: 'update' } as Todo).catch((error) => {
      expect(error).toBe('Todo is missing in result');
    });

    mockedGraphQL.mockResolvedValueOnce({ data: null });
    TodoAPI.updateTodo({ message: 'update' } as Todo).catch((error) => {
      expect(error).toBe('Todo is missing in result');
    });
  });

  test('delete todo', () => {
    expect.assertions(1);

    mockedGraphQL.mockResolvedValueOnce({});
    // delete only resolves, not result expected
    expect(TodoAPI.deleteTodo({ id: '1' } as Todo)).resolves.toBeUndefined();
  });

  test('single fetch error', () => {
    expect.assertions(1);

    mockedGraphQL.mockRejectedValueOnce({
      errors: [{ message: 'Failed to load todo' }],
    });

    TodoAPI.fetchTodo('1').catch((error) => {
      expect(error).toEqual('Failed to load todo');
    });
  });

  test('list fetch error', () => {
    expect.assertions(1);

    const errorMessage = 'List fetch error';
    mockedGraphQL.mockRejectedValueOnce({
      errors: [{ message: errorMessage }],
    });

    TodoAPI.fetchTodos(null, ModelSortDirection.DESC).catch((error) => {
      expect(error).toEqual(errorMessage);
    });
  });

  test('create error', () => {
    expect.assertions(1);

    const errorMessage = 'Create error';
    mockedGraphQL.mockRejectedValueOnce({
      errors: [{ message: errorMessage }],
    });

    TodoAPI.createTodo({ message: '' } as Todo).catch((error) => {
      expect(error).toEqual(errorMessage);
    });
  });

  test('update error', () => {
    expect.assertions(1);

    const errorMessage = 'Update error';
    mockedGraphQL.mockRejectedValueOnce({
      errors: [{ message: errorMessage }],
    });

    TodoAPI.updateTodo({ message: 'update' } as Todo).catch((error) => {
      expect(error).toEqual(errorMessage);
    });
  });

  test('delete error', () => {
    expect.assertions(1);

    mockedGraphQL.mockRejectedValueOnce({});

    TodoAPI.deleteTodo({ id: '1' } as Todo).catch((error) => {
      expect(error).toEqual('');
    });
  });
});
