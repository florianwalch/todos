import { CognitoUserAmplify } from '@aws-amplify/ui';
import { type Story } from '@storybook/react';
import { jest } from '@storybook/jest';

import { UserContextWrapper } from '@/context/user';
import { UserAPI } from '@/api/user';

// create mock API
export const mockedUserAPI = jest.mocked(UserAPI, true) as jest.Mocked<
  typeof UserAPI
>;

// mock sign out function
export const mockedSignOut = jest.fn() as jest.MockedFunction<() => void>;

// create mock user
export const mockUser = {
  username: 'Storybook user',
} as CognitoUserAmplify;

/**
 * Storybook decorator of user context.
 *
 * @param {Story} Story - current story
 */
export function UserContextDecorator(Story: Story) {
  return (
    <UserContextWrapper user={mockUser} signOut={mockedSignOut}>
      <Story />
    </UserContextWrapper>
  );
}
