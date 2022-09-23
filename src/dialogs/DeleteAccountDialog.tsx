import { useState } from 'react';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

import { Dialog } from '@/components/Dialog/Dialog';
import { DialogButton } from '@/components/Dialog/DialogButton';
import { DialogPopover } from '@/components/Dialog/DialogPopover';
import { useUserContext } from '@/context/user';
import { useNotificationContext } from '@/context/notification';

/**
 * Dialog to delete current user account.
 */
export function DeleteAccountDialog() {
  const { deleteAccount } = useUserContext();
  const { showNotification } = useNotificationContext();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogButton>
        <Button color="error" variant="outlined">
          Delete Account
        </Button>
      </DialogButton>

      <DialogPopover>
        {({ closeDialog }) => (
          <>
            <DialogTitle>Delete account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to delete your account? This action can not
                be undone!
              </DialogContentText>

              {deleteError && (
                <Typography color="error" sx={{ my: 5 }}>
                  {deleteError}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button
                color="error"
                onClick={() => {
                  deleteAccount()
                    .then(() => {
                      closeDialog();
                      showNotification('Account has been deleted.');
                    })
                    .catch((err) => {
                      setDeleteError(err);
                    });
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
