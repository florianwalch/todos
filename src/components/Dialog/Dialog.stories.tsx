import { type ComponentMeta, type ComponentStory } from '@storybook/react';

import {
  userEvent,
  within,
  waitForElementToBeRemoved,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Dialog } from '@/components/Dialog/Dialog';
import { DialogButton } from '@/components/Dialog/DialogButton';
import { DialogPopover } from '@/components/Dialog/DialogPopover';

export default {
  title: 'Components/Dialogs',
  component: Dialog,
  subcomponents: { DialogButton, DialogPopover },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => (
  <Dialog {...args}>
    <DialogButton>
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </DialogButton>
    <DialogPopover>
      {({ closeDialog }) => (
        <>
          <DialogTitle>Storybook dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>This is a Storybook popover.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Close</Button>
          </DialogActions>
        </>
      )}
    </DialogPopover>
  </Dialog>
);

export const Default = Template.bind({});

Default.parameters = {
  docs: {
    iframeHeight: 400,
    inlineStories: false,
    source: {
      code: `
<Dialog>
  <DialogButton> ...Some Button </DialogButton>
  <DialogPopover>
    {({ closeDialog }) => (
      ...Some popover content
    )}
  </DialogPopover>
</Dialog>`,
      language: 'jsx',
      type: 'auto',
    },
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByRole('button');

  await userEvent.click(button);

  const popover = await canvas.findByText(/Storybook dialog/);
  expect(popover).not.toBeNull();

  const closeButton = canvas.getByText(/Close/);
  await userEvent.click(closeButton);

  await waitForElementToBeRemoved(await canvas.findByText(/Storybook dialog/));
};
