import { useCallback, useState } from 'react';
import {
  type ModelSortDirection,
  type ModelTodoFilterInput,
  type Todo,
} from '@/API';

import { TodoAPI } from '@/api/todo';

// type of result
type FetchResult = {
  fetchTodos: (
    filter: ModelTodoFilterInput | null,
    sortOrder: ModelSortDirection,
  ) => void;
  todos: Todo[] | null;
  isLoading: boolean;
};

/**
 * Search todos for given search value.
 *
 * @param {Todo[]} todos - todos to search
 * @param {string} searchValue - value to search for
 */
function searchTodos(todos: Todo[] | null, searchValue: string) {
  // don't search for nothing
  if (searchValue === '' || todos == null) {
    return todos;
  }

  // prepare search value
  const val = searchValue.toLowerCase();

  // look for value in todos title & message
  return todos.filter(
    ({ title, message }) =>
      title.toLowerCase().match(val) || message.toLowerCase().match(val),
  );
}

/**
 * Hook that loads todos & filters for search value.
 *
 * @param {string} searchValue - filter for item that match term
 */
export function useFetchTodos(searchValue: string): FetchResult {
  // define states
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Array<Todo> | null>(null);

  // create fetch function
  const fetchTodos = useCallback(
    (filter: ModelTodoFilterInput | null, sortOrder: ModelSortDirection) => {
      // update loader
      setIsLoading(true);

      // load todos
      TodoAPI.fetchTodos(filter, sortOrder)
        // update state
        .then((todos) => {
          setTodos(todos);
        })
        // hide loader
        .finally(() => {
          setIsLoading(false);
        });
    },
    [],
  );

  return {
    fetchTodos,
    todos: searchTodos(todos, searchValue),
    isLoading,
  };
}
