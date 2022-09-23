import { Auth } from '@aws-amplify/auth';
import { type CognitoUserAmplify } from '@aws-amplify/ui';

/**
 * Update password for given user.
 *
 * @param {CognitoUserAmplify} user - amplify user
 * @param {string} oldPassword - users old password
 * @param {string} newPassword - users new password
 */
function updatePassword(
  user: CognitoUserAmplify,
  oldPassword: string,
  newPassword: string,
): Promise<void | string> {
  return new Promise((resolve, reject) => {
    // change password via Amplify Auth API
    Auth.changePassword(user, oldPassword, newPassword)
      .then(() => resolve())
      .catch((err) => reject(err.message));
  });
}

/**
 * Delete current user account.
 */
function deleteUser(): Promise<void | string> {
  return new Promise((resolve, reject) => {
    // delete user via Amplify Auth API
    Auth.deleteUser()
      .then(() => resolve())
      .catch((err) => reject(err.message));
  });
}

// export API
export const UserAPI = {
  updatePassword,
  deleteUser,
};
