import { Skeleton, TextField } from '@mui/material';

/**
 * Placeholder component for todo form.
 */
export function TodoFormSkeleton() {
  return (
    <>
      <Skeleton width="100%">
        <TextField
          fullWidth
          variant="standard"
          margin="normal"
          label="Title"
          id="title"
        />
      </Skeleton>

      <Skeleton width="100%">
        <TextField
          multiline
          fullWidth
          minRows={4}
          variant="standard"
          margin="normal"
          label="Message"
          id="message"
        />
      </Skeleton>
    </>
  );
}
