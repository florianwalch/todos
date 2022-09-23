import { TransitionGroup } from 'react-transition-group';
import { Box, Collapse, Typography } from '@mui/material';

import { type Todo } from '@/API';

import { TodosListItem } from '@/components/TodosList/TodosListItem';
import { TodoListSkeleton } from '@/components/TodosList/TodoListSkeleton';

// type of component props
type TodosListProps = {
  todos: Todo[] | null;
  onMarkAsDone: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

/**
 * List of todo items.
 *
 * Renders TodosListItem component for each todo item.
 * Returns placeholder element if list is empty.
 *
 * @see TodoListSkeleton
 * @see TodosListItem
 *
 * @param {TodosListProps} props - component props
 */
export function TodosList({ todos, onMarkAsDone, onDelete }: TodosListProps) {
  if (todos == null) {
    return <TodoListSkeleton />;
  }

  if (todos.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ my: 5 }}>
        You do not have any tasks yet. Click on the button in the bottom left to
        create one.
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 5 }}>
      <TransitionGroup>
        {todos.map((todo) => {
          return (
            <Collapse
              key={todo.id}
              sx={{
                '&:not(:last-child)': {
                  mb: 5,
                },
              }}>
              <TodosListItem
                todo={todo}
                onMarkAsDone={() => onMarkAsDone(todo)}
                onDelete={() => onDelete(todo)}
              />
            </Collapse>
          );
        })}
      </TransitionGroup>
    </Box>
  );
}
