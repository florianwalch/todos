import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

// type of context
type DialogContextType = {
  dialogIsOpen: boolean;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
};

// create react context
const DialogContext = createContext<DialogContextType | null>(null);

// props of context wrapper component
type DialogProps = {
  children: ReactNode;
};

/**
 * Hook to provide access to context.
 */
export function useDialogContext(): DialogContextType {
  const context = useContext(DialogContext);
  /* istanbul ignore next */
  if (context == null) {
    throw new Error('DialogContext is missing.');
  }

  return context;
}

/**
 * Root component for dialogs.
 *
 * Holds state if dialog is opened/closed.
 *
 * Used in combination with DialogButton & DialogPopover component.
 * Example:
 * ```
 * <Dialog>
 *   <DialogButton>...</DialogButton>
 *   <DialogPopover>...</DialogPopover>
 * </Dialog>
 * ```
 *
 * @param {DialogProps} props - component props
 */
export function Dialog({ children }: DialogProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const value = {
    dialogIsOpen,
    setDialogIsOpen,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}
