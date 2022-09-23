import { Box, Skeleton } from '@mui/material';

/**
 * Placeholder component for todo list.
 */
export function TodoListSkeleton() {
  return (
    <>
      {Array.from(Array(3)).map((_, i) => {
        return (
          <Box display="flex" key={i} alignItems="center" sx={{ my: 5 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="100%" height={60} sx={{ ml: 5 }} />
          </Box>
        );
      })}
    </>
  );
}
