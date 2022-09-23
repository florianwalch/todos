import { cloneElement, type MouseEvent, type ReactElement } from 'react';

import { useDialogContext } from '@/components/Dialog/Dialog';

// type of component props
type DialogButtonProps = {
  children: ReactElement<{ onClick: (evt: MouseEvent<HTMLElement>) => void }>;
};

/**
 * Button to use in Dialogs.
 * @see Dialog
 *
 * @param {DialogButtonProps} props - component props
 */
export function DialogButton({ children }: DialogButtonProps) {
  const { setDialogIsOpen } = useDialogContext();

  // update state of dialog context
  const onClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setDialogIsOpen(true);
  };

  // set/override onclick handler of
  // child component
  return cloneElement(children, {
    onClick,
  });
}
