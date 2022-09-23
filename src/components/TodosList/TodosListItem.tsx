import { type MouseEvent } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import RemoveDoneOutlinedIcon from '@mui/icons-material/RemoveDoneOutlined';

import { type Todo } from '@/API';
import { DateUtil } from '@/utils/date';
import { DeleteTodoDialog } from '@/dialogs/DeleteTodoDialog';
import { StyledLink } from '@/components/Navigation/Link';

// styled box for todo item
const StyledListItemBox = styled(Box, {
  shouldForwardProp(propName) {
    return propName !== 'isDue';
  },
})<{ isDue?: boolean }>(({ theme, isDue }) => ({
  padding: 25,
  transition: theme.transitions.create(['background-color', 'box-shadow']),

  backgroundColor: isDue
    ? theme.palette.warning.main
    : theme.palette.primary.main,

  '&:hover': {
    boxShadow: theme.shadows[12],
    backgroundColor: isDue
      ? theme.palette.warning.dark
      : theme.palette.primary.dark,
  },

  [theme.breakpoints.up('md')]: {
    '& .hidden': {
      display: 'none',
    },

    '&:hover .hidden': {
      display: 'flex',
    },
  },
}));

// type of component props
type TodosListItemProps = {
  todo: Todo;
  onMarkAsDone: () => void;
  onDelete: () => void;
};

/**
 * Item of todo list.
 *
 * Provides options to delete todo or mark a todo as done.
 * Shows indicator icon if todo is due.
 *
 * @param {TodosListItemProps} props - component props
 */
export function TodosListItem({
  todo,
  onMarkAsDone,
  onDelete,
}: TodosListItemProps) {
  const isDue =
    todo.dueDate == null ? false : DateUtil.dateIsBefore(todo.dueDate);

  // handle click to mark as done
  const handleMarkAsDoneClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onMarkAsDone();
  };

  return (
    <StyledLink to={`todo/${todo.id}`} data-testid="todo-link">
      <StyledListItemBox
        display="flex"
        justifyContent="space-between"
        isDue={isDue}>
        <Box
          px={1}
          flex={1}
          height={40}
          display="flex"
          alignItems="center"
          overflow="hidden"
          color="primary.contrastText">
          {isDue && <AccessAlarmOutlinedIcon color="inherit" sx={{ mr: 5 }} />}

          <Typography
            variant="h6"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {todo.title}
          </Typography>
        </Box>

        <Box
          display="flex"
          flexGrow={0}
          className="hidden"
          color="primary.contrastText">
          <IconButton
            color="inherit"
            data-testid="mark-as-done-button"
            sx={{ mr: 2 }}
            onClick={handleMarkAsDoneClick}>
            {todo.isDone ? <RemoveDoneOutlinedIcon /> : <DoneOutlinedIcon />}
          </IconButton>

          <DeleteTodoDialog onDelete={onDelete} />
        </Box>
      </StyledListItemBox>
    </StyledLink>
  );
}
