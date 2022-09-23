import { Box, Typography } from '@mui/material';

import { DeleteAccountDialog } from '@/dialogs/DeleteAccountDialog';
import { ChangePasswordDialog } from '@/dialogs/ChangePasswordDialog';

import { MainPaper } from '@/components/Layout/MainPaper/MainPaper';
import { ScrollContainer } from '@/components/Layout/Container/ScrollContainer';
import { Section } from '@/components/Layout/Container/Section';

/**
 * View for /account route.
 *
 * Provides options to change password &
 * delete user account.
 */
export function AccountView() {
  return (
    <MainPaper elevation={8}>
      <ScrollContainer flex={1}>
        <Box px={2}>
          <Typography variant="h4" sx={{ mb: 10 }}>
            Account
          </Typography>

          <Section>
            <Typography variant="subtitle1" mb={5}>
              Change password
            </Typography>

            <ChangePasswordDialog />
          </Section>

          <Section>
            <Typography variant="subtitle1" mb={5}>
              Delete account
            </Typography>

            <DeleteAccountDialog />
          </Section>
        </Box>
      </ScrollContainer>
    </MainPaper>
  );
}
