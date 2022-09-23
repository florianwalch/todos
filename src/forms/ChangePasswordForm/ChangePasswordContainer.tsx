import { type ComponentProps } from 'react';

import { useUserContext } from '@/context/user';
import { FormContainer } from '@/components/Forms/FormContainer';
import {
  ChangePasswordForm,
  type ChangePasswordFormData,
} from '@/forms/ChangePasswordForm/ChangePasswordForm';

// type of component props
type ChangePasswordContainerProps = {
  onCancel: ComponentProps<typeof ChangePasswordForm>['onCancel'];
  onChange: () => void;
};

/**
 * Container for change password form.
 *
 * @param {ChangePasswordContainerProps} props - component props
 */
export function ChangePasswordContainer({
  onCancel,
  onChange,
}: ChangePasswordContainerProps) {
  const { changePassword } = useUserContext();

  // handle form submit
  const onSubmit = (formData: ChangePasswordFormData) => {
    return changePassword(formData.oldPassword, formData.newPassword);
  };

  return (
    <FormContainer
      successNotificationMessage="Password has been changed."
      onSubmit={onSubmit}
      onSuccess={onChange}>
      <ChangePasswordForm onCancel={onCancel} />
    </FormContainer>
  );
}
