import { type ReactNode, createContext, useContext, useState } from 'react';

import { Alert, Slide, Snackbar } from '@mui/material';

// type of context
type NotificationContextType = {
  showNotification: (message: string) => void;
};

// type of component props
type NotificationContextWrapperProps = {
  children: ReactNode;
};

// create context
export const NotificationContext =
  createContext<NotificationContextType | null>(null);

// provide access to context
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  /* istanbul ignore next */
  if (context == null) {
    throw 'NotificationContext is missing';
  }

  return context;
};

/**
 * Wrapper for notification context.
 *
 * Renders a MUI Snackbar component if a notification message has been set.
 * The snackbar disappears automatically after 6 seconds.
 *
 * @param {NotificationContextWrapperProps} props - component props
 */
export function NotificationContextWrapper({
  children,
}: NotificationContextWrapperProps) {
  // define sate
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null,
  );

  /**
   * This function will be available via the context &
   * will show the notification with the given message.
   *
   * @param {string} message - message to show
   */
  const showNotification = (message: string): void => {
    setNotificationMessage(message);
  };

  /**
   * Called after the notification has disappeared.
   */
  const handleNotificationClose = () => {
    setNotificationMessage(null);
  };

  // create context value
  const contextValue = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}

      <Snackbar
        open={notificationMessage != null}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        TransitionComponent={Slide}>
        <Alert
          onClose={handleNotificationClose}
          severity="success"
          sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}
