import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import { type Todo } from '@/API';
import { TodoAPI } from '@/api/todo';
import { DateUtil } from '@/utils/date';

import { MainPaper } from '@/components/Layout/MainPaper/MainPaper';
import { ViewBar } from '@/components/Bars/ViewBar';
import { ScrollContainer } from '@/components/Layout/Container/ScrollContainer';

import { TodoFormContainer } from '@/forms/TodoForm/TodoFormContainer';

/**
 * View for a single todo.
 * Accessible at /todo/:todoId route
 */
export function TodoView() {
  const { todoId } = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);

  // fetch todo for current id
  useEffect(() => {
    /* istanbul ignore if */
    if (todoId == null) {
      return;
    }

    // fetch todo & update state
    TodoAPI.fetchTodo(todoId).then((todo) => {
      setTodo(todo);
    });
  }, [todoId]);

  return (
    <MainPaper elevation={8}>
      <ViewBar>
        {todo && (
          <Box display="flex" alignItems="center">
            <Link to="/">
              <IconButton edge="start" data-testid="back-to-list-button">
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="caption">
              Last updated: {DateUtil.dateFromNow(todo.updatedAt)}
            </Typography>
          </Box>
        )}
      </ViewBar>

      <ScrollContainer flex={1}>
        <Box px={2}>
          <TodoFormContainer todo={todo} onUpdate={setTodo} />
        </Box>
      </ScrollContainer>
    </MainPaper>
  );
}
