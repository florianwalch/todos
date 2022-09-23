import {
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Dialog } from '@/components/Dialog/Dialog';
import { DialogButton } from '@/components/Dialog/DialogButton';
import { DialogPopover } from '@/components/Dialog/DialogPopover';
import { ChangePasswordContainer } from '@/forms/ChangePasswordForm/ChangePasswordContainer';

/**
 * Dialog to change the user password.
 */
export function ChangePasswordDialog() {
  return (
    <Dialog>
      <DialogButton>
        <Button variant="outlined">Change password</Button>
      </DialogButton>

      <DialogPopover>
        {({ closeDialog }) => (
          <>
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Here you can change your password.
              </DialogContentText>

              <ChangePasswordContainer
                onChange={closeDialog}
                onCancel={closeDialog}
              />
            </DialogContent>
          </>
        )}
      </DialogPopover>
    </Dialog>
  );
}
