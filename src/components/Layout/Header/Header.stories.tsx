import { type ComponentProps } from 'react';
import { type ComponentMeta, type Story } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import {
  mockedSignOut,
  UserContextDecorator,
} from '@sb/decorators/UserContextDecorator';

import { Header } from '@/components/Layout/Header/Header';

export default {
  title: 'Components/Layout/Header',
  component: Header,
  decorators: [UserContextDecorator],
  argTypes: {
    onDrawerToggle: { action: true },
  },
  parameters: {
    docs: {
      source: {
        code: `<Header onDrawerToggle={...} />`,
        language: 'tsx',
      },
    },
  },
} as ComponentMeta<typeof Header>;

const Template: Story<ComponentProps<typeof Header>> = (args) => (
  <Header {...args} />
);

export const Default = Template.bind({});

export const ToggleDrawer = Template.bind({});
ToggleDrawer.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const toggleButton = canvas.getByTestId('toggle-button');
  await userEvent.click(toggleButton);

  await expect(args.onDrawerToggle).toBeCalled();
};

export const SignOut = Template.bind({});
SignOut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const signOutButton = canvas.getByTestId('signOut-button');
  await userEvent.click(signOutButton);

  await expect(mockedSignOut).toBeCalled();
};
