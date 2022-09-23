import { jest, describe, expect, test } from '@jest/globals';
import { Auth } from '@aws-amplify/auth';
import { UserAPI } from '@/api/user';
import { type CognitoUserAmplify } from '@aws-amplify/ui';

jest.mock('@aws-amplify/auth');

const mockedChangePassword = Auth.changePassword as jest.MockedFunction<
  typeof Auth.changePassword
>;
const mockedDeleteUser = Auth.deleteUser as jest.MockedFunction<
  typeof Auth.deleteUser
>;

afterEach(() => {
  mockedChangePassword.mockClear();
  mockedDeleteUser.mockClear();
});

describe('user api', () => {
  test('change password', () => {
    expect.assertions(2);

    mockedChangePassword.mockResolvedValueOnce('SUCCESS');
    expect(
      UserAPI.updatePassword({} as CognitoUserAmplify, '', ''),
    ).resolves.toBeUndefined();

    mockedChangePassword.mockRejectedValueOnce({
      message: 'Failed to change password',
    });

    UserAPI.updatePassword({} as CognitoUserAmplify, '', '').catch((error) => {
      expect(error).toEqual('Failed to change password');
    });
  });

  test('delete users', () => {
    expect.assertions(2);

    mockedDeleteUser.mockResolvedValueOnce(undefined);
    expect(UserAPI.deleteUser()).resolves.toBeUndefined();

    mockedDeleteUser.mockRejectedValueOnce({
      message: 'Failed to delete user',
    });

    UserAPI.deleteUser().catch((error) => {
      expect(error).toEqual('Failed to delete user');
    });
  });
});
