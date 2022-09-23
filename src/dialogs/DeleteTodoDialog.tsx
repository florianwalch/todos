import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Dialog } from '@/components/Dialog/Dialog';
import { DialogButton } from '@/components/Dialog/DialogButton';
import { DialogPopover } from '@/components/Dialog/DialogPopover';

// type of component props
type DeleteTodoDialogProps = {
  onDelete: () => void;
};

/**
 * Dialog to delete a single todo.
 *
 * @param {DeleteTodoDialogProps} props - component props
 */
export function DeleteTodoDialog({ onDelete }: DeleteTodoDialogProps) {
  return (
    <Dialog>
      <DialogButton>
        <IconButton color="inherit" data-testid="delete-button">
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </DialogButton>

      <DialogPopover>
        {({ closeDialog }) => (
          <>
            <DialogTitle>Delete todo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to delete your todo? This action can not be
                undone!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(evt) => {
                  evt.preventDefault();
                  closeDialog();
                }}>
                Cancel
              </Button>
              <Button
                color="error"
                onClick={(evt) => {
                  evt.preventDefault();
                  closeDialog();
                  onDelete();
                }}>
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </DialogPopover>
    </Dialog>
  );
}
