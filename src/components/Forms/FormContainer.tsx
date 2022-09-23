import { cloneElement, type ReactElement, useState } from 'react';

import { Loader } from '@/components/Loader/Loader';
import { useNotificationContext } from '@/context/notification';

// type of component props
type FormContainerProps<D, R> = {
  onSubmit: (data: D) => Promise<R>;
  onSuccess: (data: R) => void;
  onError?: (error: string) => void;
  successNotificationMessage?: string;

  children: ReactElement<{
    onSubmit: (data: D) => void;
    formError: string | null;
  }>;
};

/**
 * Container component for forms to handle submit, error handling,
 * request state & success notification.
 *
 * @param {FormContainerProps} props - component props
 */
export function FormContainer<D, R>({
  children,
  onSubmit,
  onSuccess,
  onError,
  successNotificationMessage,
}: FormContainerProps<D, R>) {
  const { showNotification } = useNotificationContext();

  // define states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  /**
   * Handle submit of form child component.
   */
  const handleSubmit = (data: D) => {
    // update state to show loader
    setIsSubmitting(true);

    // perform submit call
    onSubmit(data)
      .then((result) => {
        // exec callback
        onSuccess(result);

        // show notification if one is set
        /* istanbul ignore else */
        if (successNotificationMessage != null) {
          showNotification(successNotificationMessage);
        }
      })
      .catch((err) => {
        // store error
        setFormError(err);

        // exec error callback
        /* istanbul ignore else */
        if (onError != null) {
          onError(err);
        }
      })
      .finally(() => {
        // reset loading state
        setIsSubmitting(false);
      });
  };

  // pass submit handler & error state to form
  const form = cloneElement(children, {
    formError,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {form}
      {isSubmitting && <Loader />}
    </>
  );
}
