import { type FieldErrors, useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';

import { type Todo } from '@/API';
import { TextField } from '@/components/Forms/FormFields/TextField';
import { FormFieldCheckbox } from '@/components/Forms/FormFields/Checkbox';
import { DateUtil } from '@/utils/date';

// type of form data
type FormData = Pick<Todo, 'title' | 'message' | 'isDone' | 'dueDate'>;

// Form data with id (id is not used in the form, but to receive and submit)
type FormTodo = { id?: Todo['id'] } & FormData;

// type of component props
type TodoFormProps = {
  todo: FormTodo;
  onSubmit?: (todo: FormTodo) => void;
  onCancel?: () => void;
  formError?: string | null;
};

/**
 * Form to edit given todo.
 *
 * @param {TodoFormProps} props - component props
 */
export function TodoForm({
  todo: { id, title, message, isDone, dueDate },
  onSubmit,
  onCancel,
  formError,
}: TodoFormProps) {
  // initialize form
  const {
    handleSubmit,
    control,
    setFocus,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      title,
      message,
      isDone,
      dueDate,
    },
  });

  // handle form submit
  const onFormSubmit = (formData: FormData) => {
    /* istanbul ignore next */
    if (onSubmit != null) {
      onSubmit({
        id,
        ...formData,
      });
    }
  };

  // handle form errors
  const onError = (errors: FieldErrors<FormData>) => {
    const [fieldName] = Object.keys(errors) as (keyof typeof errors)[];
    setFocus(fieldName);
  };

  // handle form cancel
  const handleCancel = () => {
    reset();

    /* istanbul ignore else */
    if (onCancel != null) {
      onCancel();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit, onError)}
      noValidate
      autoComplete="off">
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        <Box
          sx={(theme) => ({
            width: {
              xs: '100%',
              md: `calc(50% - ${theme.spacing(5)})`,
            },
          })}>
          <TextField
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            TextFieldProps={{
              type: 'text',
              label: 'Title',
              id: 'title',
              sx: { my: 5 },
              error: errors.title != null,
              helperText: errors.title?.message,
            }}
          />

          <TextField
            name="message"
            control={control}
            rules={{ required: 'Content is required' }}
            TextFieldProps={{
              type: 'text',
              multiline: true,
              minRows: 4,
              label: 'Content',
              id: 'content',
              sx: { my: 5 },
              error: errors.message != null,
              helperText: errors.message?.message,
            }}
          />
        </Box>

        <Box
          sx={(theme) => ({
            width: {
              xs: '100%',
              md: `calc(50% - ${theme.spacing(5)})`,
            },
          })}>
          <TextField
            name="dueDate"
            control={control}
            valueTransformer={{
              in: (val) =>
                val == null ? '' : DateUtil.formatDate(val as string),
              out: (val) => (val === '' ? null : DateUtil.dateToISO(val)),
            }}
            TextFieldProps={{
              InputLabelProps: { shrink: true },
              type: 'date',
              label: 'Due date',
              id: 'date',
              sx: { my: 5 },
            }}
          />

          <FormFieldCheckbox
            name="isDone"
            control={control}
            CheckboxProps={{
              label: 'Mark as done',
              id: 'mark-as-done',
              sx: { my: 5 },
            }}
          />
        </Box>
      </Box>

      {formError != null && (
        <Box sx={{ my: 3 }} color="error.dark">
          <Typography variant="body1" color="inherit">
            {formError}
          </Typography>
        </Box>
      )}

      <Box mt={5}>
        <Button
          color="primary"
          type="submit"
          disabled={!isDirty}
          sx={{
            ml: '-8px',
            mr: 5,
          }}>
          Save
        </Button>
        <Button
          color="inherit"
          disabled={!(isDirty || onCancel != null)}
          onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </form>
  );
}
