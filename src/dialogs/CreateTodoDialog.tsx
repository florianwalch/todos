import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Dialog } from '@/components/Dialog/Dialog';
import { DialogButton } from '@/components/Dialog/DialogButton';
import { DialogPopover } from '@/components/Dialog/DialogPopover';
import { CreateTodoFormContainer } from '@/forms/CreateTodoForm/CreateTodoFormContainer';
import { type Todo } from '@/API';

// type of component props
type CreateTodoDialogProps = {
  onTodoCreate: (title: Todo) => void;
};

/**
 * Dialog to create a new todo.
 *
 * Popover shows the TodoForm.
 *
 * @param {CreateTodoDialogProps} props - component props
 */
export function CreateTodoDialog({ onTodoCreate }: CreateTodoDialogProps) {
  const initialTodo = {
    title: '',
    message: '',
    isDone: false,
    dueDate: null,
  };

  return (
    <Dialog>
      <DialogButton>
        <Fab
          color="primary"
          aria-label="add"
          data-testid="create-todo-button"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}>
          <AddIcon />
        </Fab>
      </DialogButton>
      <DialogPopover>
        {({ closeDialog }) => (
          <>
            <DialogTitle>New Todo</DialogTitle>
            <DialogContent>
              <DialogContentText>Create a new todo.</DialogContentText>

              <CreateTodoFormContainer
                todo={initialTodo}
                onCreate={(todo) => {
                  onTodoCreate(todo);
                  closeDialog();
                }}
                onCancel={closeDialog}
              />
            </DialogContent>
          </>
        )}
      </DialogPopover>
    </Dialog>
  );
}
