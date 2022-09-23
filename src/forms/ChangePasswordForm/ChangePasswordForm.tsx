import { type FieldErrors, useForm } from 'react-hook-form';

import { Box, Button, Typography } from '@mui/material';

import { TextField } from '@/components/Forms/FormFields/TextField';

// type of form data
export type ChangePasswordFormData = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

// type of component props
type ChangePasswordFormProps = {
  onCancel: () => void;
  onSubmit?: (data: ChangePasswordFormData) => void;
  formError?: string | null;
};

/**
 * Form to change the user password.
 *
 * @param {ChangePasswordFormProps} props - component props
 */
export function ChangePasswordForm({
  onSubmit,
  onCancel,
  formError,
}: ChangePasswordFormProps) {
  // initialize form
  const {
    handleSubmit,
    watch,
    control,
    setFocus,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  // set up password validator
  const newPassword = watch('newPassword');
  const validatePasswordMatch = (value: string) =>
    value === newPassword || 'Password does not match';

  // handle form errors
  const onError = (errors: FieldErrors<ChangePasswordFormData>) => {
    const [fieldName] = Object.keys(errors) as (keyof typeof errors)[];
    setFocus(fieldName);
  };

  // submit form data
  const onFormSubmit = (formData: ChangePasswordFormData) => {
    /* istanbul ignore else */
    if (onSubmit != null) {
      onSubmit(formData);
    }
  };

  // render form
  return (
    <form
      onSubmit={handleSubmit(onFormSubmit, onError)}
      noValidate
      autoComplete="off">
      <TextField
        name="oldPassword"
        control={control}
        rules={{ required: 'Old password is required' }}
        TextFieldProps={{
          type: 'text',
          label: 'Old password',
          id: 'old-password',
          sx: { my: 5 },
          error: errors.oldPassword != null,
          helperText: errors.oldPassword?.message,
        }}
      />

      <TextField
        name="newPassword"
        control={control}
        rules={{ required: 'New password is required' }}
        TextFieldProps={{
          type: 'password',
          label: 'New password',
          id: 'new-password',
          sx: { my: 5 },
          error: errors.newPassword != null,
          helperText: errors.newPassword?.message,
        }}
      />

      <TextField
        name="newPasswordConfirm"
        control={control}
        rules={{
          required: 'Confirm your new password',
          validate: validatePasswordMatch,
        }}
        TextFieldProps={{
          type: 'password',
          label: 'Confirm password',
          id: 'confirm-password',
          sx: { my: 5 },
          error: errors.newPasswordConfirm != null,
          helperText: errors.newPasswordConfirm?.message,
        }}
      />

      {formError && (
        <Typography color="error" sx={{ my: 5 }}>
          {formError}
        </Typography>
      )}

      <Box display="flex">
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" type="submit" disabled={!isDirty}>
          Change password
        </Button>
      </Box>
    </form>
  );
}
