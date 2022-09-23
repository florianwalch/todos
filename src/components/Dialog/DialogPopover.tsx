import { type ReactNode } from 'react';

import { Dialog as MuiDialog } from '@mui/material';

import { useDialogContext } from '@/components/Dialog/Dialog';

// type of component props
type DialogPopoverProps = {
  children: (props: { closeDialog: () => void }) => ReactNode;
};

/**
 * Popover used in Dialogs.
 * Component expects children prop to be a render function,
 * which receives a function to close the popover.
 * @see Dialog
 *
 * @param {DialogPopoverProps} props - component props
 */
export function DialogPopover({ children }: DialogPopoverProps) {
  const { dialogIsOpen, setDialogIsOpen } = useDialogContext();

  // update state of dialog context
  const closeDialog = () => {
    setDialogIsOpen(false);
  };

  return (
    <MuiDialog open={dialogIsOpen} onClose={closeDialog} disablePortal={true}>
      {children({ closeDialog })}
    </MuiDialog>
  );
}
