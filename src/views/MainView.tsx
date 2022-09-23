import { useEffect, useState } from 'react';

import { Box, Collapse } from '@mui/material';

import {
  ModelSortDirection,
  type ModelTodoFilterInput,
  type Todo,
} from '@/API';

import { TodoAPI } from '@/api/todo';

import { DateUtil } from '@/utils/date';
import { useFetchTodos } from '@/hooks/todos';
import { useNotificationContext } from '@/context/notification';

import { ViewBar } from '@/components/Bars/ViewBar';
import { FilterBar, type FilterOptions } from '@/components/Bars/FilterBar';
import { TodosList } from '@/components/TodosList/TodosList';
import { Search } from '@/components/Search/Search';
import { Switch } from '@/components/Controls/Switch';
import { Loader } from '@/components/Loader/Loader';
import { MainPaper } from '@/components/Layout/MainPaper/MainPaper';
import { ScrollContainer } from '@/components/Layout/Container/ScrollContainer';

import { CreateTodoDialog } from '@/dialogs/CreateTodoDialog';

/**
 * Main view of application.
 * Accessible via / route.
 *
 * Includes list of todos and search & filter bar.
 */
export function MainView() {
  const { showNotification } = useNotificationContext();

  // define states
  const [searchValue, setSearchValue] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    isDone: false,
    sortByDate: ModelSortDirection.DESC,
    isDue: false,
  });

  // get todo states
  const { todos, isLoading, fetchTodos } = useFetchTodos(searchValue);

  // reload todos when filters change
  useEffect(() => {
    loadTodos();
  }, [filterOptions]);

  /**
   * Prepare filters & fetch todos
   */
  const loadTodos = () => {
    const { isDone, isDue, sortByDate } = filterOptions;
    const queryFilter: ModelTodoFilterInput = {};
    let hasFilter = false;

    // add is done filter
    if (!isDone) {
      queryFilter.isDone = { eq: false };
      hasFilter = true;
    }

    // add due filter
    if (isDue) {
      queryFilter.dueDate = { lt: DateUtil.dateToISO() };
      hasFilter = true;
    }

    // fetch todos
    fetchTodos(hasFilter ? queryFilter : null, sortByDate);
  };

  /**
   * Reload list after todo has been created.
   */
  const onTodoCreate = () => {
    loadTodos();
  };

  /**
   * Update given todo by inverting 'isDone' state.
   *
   * Reloads list & shows notification after success.
   *
   * @param {Todo} todo - todo to update
   */
  const onMarkAsDone = (todo: Todo) => {
    TodoAPI.updateTodo({
      id: todo.id,
      isDone: !todo.isDone,
    }).then(() => {
      showNotification('Todo has been updated.');
      loadTodos();
    });
  };

  /**
   * Delete given todo.
   *
   * @param {Todo} todo
   */
  const onDelete = (todo: Todo) => {
    TodoAPI.deleteTodo(todo).then(() => {
      showNotification('Todo has been deleted.');
      loadTodos();
    });
  };

  return (
    <MainPaper elevation={8}>
      <ViewBar>
        <Box display="flex">
          <Search searchValue={searchValue} onChange={setSearchValue} />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Switch
              label="Filter"
              checked={showFilter}
              onChange={(evt) => setShowFilter(evt.target.checked)}
            />
          </Box>
        </Box>

        <Collapse in={showFilter} mountOnEnter={true} unmountOnExit={true}>
          <Box mt={4}>
            <FilterBar
              filterOptions={filterOptions}
              onChange={setFilterOptions}
            />
          </Box>
        </Collapse>
      </ViewBar>

      <ScrollContainer flex={1}>
        <TodosList
          todos={todos}
          onMarkAsDone={onMarkAsDone}
          onDelete={onDelete}
        />

        {isLoading && todos != null && <Loader />}
      </ScrollContainer>

      <CreateTodoDialog onTodoCreate={onTodoCreate} />
    </MainPaper>
  );
}
