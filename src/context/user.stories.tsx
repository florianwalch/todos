import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { type CognitoUserAmplify } from '@aws-amplify/ui';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Button } from '@mui/material';

import { UserContextWrapper, useUserContext } from '@/context/user';
import { UserAPI } from '@/api/user';

const mockedUserAPI = jest.mocked(UserAPI, true) as jest.Mocked<typeof UserAPI>;
mockedUserAPI.updatePassword = jest.fn() as jest.MockedFunction<
  typeof UserAPI.updatePassword
>;

mockedUserAPI.deleteUser = jest.fn() as jest.MockedFunction<
  typeof UserAPI.deleteUser
>;

const defaultUser = {
  username: 'Storybook user',
} as CognitoUserAmplify;

export default {
  title: 'Contexts/User',
  component: UserContextWrapper,
  args: {
    user: defaultUser,
  },
} as ComponentMeta<typeof UserContextWrapper>;

const UserMockComponent = () => {
  const { changePassword, deleteAccount } = useUserContext();
  return (
    <>
      <Button onClick={() => changePassword('1234', '12345')}>
        Update password
      </Button>
      <Button onClick={() => deleteAccount()}>Delete</Button>
    </>
  );
};

const Template: ComponentStory<typeof UserContextWrapper> = (args) => (
  <UserContextWrapper {...args}>
    <UserMockComponent />
  </UserContextWrapper>
);

export const ChangePassword = Template.bind({});
ChangePassword.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  mockedUserAPI.updatePassword.mockResolvedValueOnce(
    'Password has been changed',
  );

  const button = canvas.getByText(/Update/);
  await userEvent.click(button);

  await expect(mockedUserAPI.updatePassword).toBeCalledWith(
    defaultUser,
    '1234',
    '12345',
  );
};

export const DeleteUser = Template.bind({});
DeleteUser.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  mockedUserAPI.deleteUser.mockResolvedValueOnce('Account deleted');

  const button = canvas.getByText(/Delete/);
  await userEvent.click(button);

  await expect(mockedUserAPI.deleteUser).toBeCalled();
};
