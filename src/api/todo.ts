import { API, graphqlOperation, type GraphQLQuery } from '@aws-amplify/api';
import { type GraphQLError } from 'graphql';

import {
  createTodo as createTodoQL,
  updateTodo as updateTodoQL,
  deleteTodo as deleteTodoQL,
} from '@/graphql/mutations';
import { getTodo, getTodosByDate } from '@/graphql/queries';

import type {
  Todo,
  CreateTodoMutation,
  DeleteTodoMutation,
  UpdateTodoMutation,
  GetTodoQuery,
  GetTodosByDateQuery,
  ModelSortDirection,
  ModelTodoFilterInput,
} from '@/API';

/**
 * Extract error messages from GraphQl requests.
 *
 * @param ex - error object
 *
 * @returns {string} - error message
 */
function buildErrorMessage(ex: { errors?: GraphQLError[] }) {
  return (ex.errors || []).map((err: GraphQLError) => err.message).join('\n');
}

/**
 * Fetch single todo via Amplify API
 *
 * @param {Todo['id']} id - id of todo
 *
 * @returns {Promise<Todo | null>}
 */
function fetchTodo(id: Todo['id']): Promise<Todo | null> {
  return new Promise((resolve, reject) => {
    // perform request
    API.graphql<GraphQLQuery<GetTodoQuery>>(
      graphqlOperation(getTodo, {
        id,
      }),
    )
      // extract result
      .then((response) => {
        resolve(response.data?.getTodo || null);
      })
      // handle error
      .catch((ex) => {
        reject(buildErrorMessage(ex));
      });
  });
}

/**
 * Fetch todo via Amplify API.
 *
 * @param {ModelTodoFilterInput | null} filter - filter options
 * @param {ModelSortDirection} sortDirection - sort direction (sort by date)
 *
 * @returns {Promise<Todo[]>}
 */
function fetchTodos(
  filter: ModelTodoFilterInput | null,
  sortDirection: ModelSortDirection,
): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    // perform request
    API.graphql<GraphQLQuery<GetTodosByDateQuery>>(
      graphqlOperation(getTodosByDate, {
        type: 'TODO',
        sortDirection,
        filter,
      }),
    )
      // extract result
      .then((response) => {
        const todos = response.data?.getTodosByDate?.items || [];
        resolve(todos.filter((todo): todo is Todo => todo != null));
      })
      // handle error
      .catch((ex) => {
        reject(buildErrorMessage(ex));
      });
  });
}

/**
 * Create todo via Amplify API.
 *
 * @param {Todo} todo - todo to create
 *
 * @returns {Promise<Todo>}
 */
function createTodo(todo: Todo): Promise<Todo> {
  // set default/required values.
  const input = {
    ...todo,
    type: 'TODO',
  };

  return new Promise((resolve, reject) => {
    // perform request
    API.graphql<GraphQLQuery<CreateTodoMutation>>(
      graphqlOperation(createTodoQL, { input }),
    )
      // extract result
      .then((response) => {
        const todo = response.data?.createTodo;
        if (todo != null) {
          resolve(todo);
        } else {
          reject('Todo is missing in result');
        }
      })
      // handle error
      .catch((ex) => {
        reject(buildErrorMessage(ex));
      });
  });
}

/**
 * Update existing todo.
 *
 * @param {Partial<Todo>} todo - todo props to update
 *
 * @returns {Promise<Todo>}
 */
function updateTodo(todo: Partial<Todo>): Promise<Todo> {
  return new Promise((resolve, reject) => {
    // perform request
    API.graphql<GraphQLQuery<UpdateTodoMutation>>(
      graphqlOperation(updateTodoQL, { input: todo }),
    )
      // extract result
      .then((response) => {
        const todo = response.data?.updateTodo;
        if (todo != null) {
          resolve(todo);
        } else {
          reject('Todo is missing in result');
        }
      })
      // handle error
      .catch((ex) => {
        reject(buildErrorMessage(ex));
      });
  });
}

/**
 * Delete passed todo.
 *
 * @param {Todo} todo - todo to delete
 */
function deleteTodo(todo: Todo): Promise<void> {
  // prepare request input
  const input = {
    id: todo.id,
  };

  return new Promise((resolve, reject) => {
    // perform request
    API.graphql<GraphQLQuery<DeleteTodoMutation>>(
      graphqlOperation(deleteTodoQL, { input }),
    )
      // extract result
      .then(() => {
        resolve();
      })
      // handle error
      .catch((ex) => {
        reject(buildErrorMessage(ex));
      });
  });
}

// export API
export const TodoAPI = {
  fetchTodo,
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
