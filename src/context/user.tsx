import { createContext, type ReactNode, useContext } from 'react';

import { type AuthEventData, type CognitoUserAmplify } from '@aws-amplify/ui';

import { UserAPI } from '@/api/user';

// type of context
type UserContextType = {
  user?: CognitoUserAmplify;
  signOut?: (data?: AuthEventData) => void;
  deleteAccount: () => Promise<void | string>;
  changePassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<void | string>;
};

// type of component props
export type UserContextWrapperProps = {
  user?: CognitoUserAmplify;
  signOut?: (data?: AuthEventData) => void;
  children: ReactNode;
};

// create context
export const UserContext = createContext<UserContextType | null>(null);

// provide access to context
export const useUserContext = () => {
  const context = useContext(UserContext);
  /* istanbul ignore if */
  if (context == null) {
    throw 'UserContext is missing';
  }

  return context;
};

/**
 * Context for current user.
 *
 * Provides access to change password & delete account.
 *
 * @param {UserContextWrapperProps} props - component props
 */
export function UserContextWrapper({
  user,
  signOut,
  children,
}: UserContextWrapperProps) {
  /**
   * Change password for current user
   *
   * @param {string} oldPassword
   * @param {string} newPassword
   */
  const changePassword = (
    oldPassword: string,
    newPassword: string,
  ): Promise<void | string> => {
    /* istanbul ignore if */
    if (user == null) {
      return Promise.reject('User is null.');
    }

    // call API
    return UserAPI.updatePassword(user, oldPassword, newPassword);
  };

  /**
   * Delete current user.
   */
  const deleteAccount = (): Promise<void | string> => {
    return UserAPI.deleteUser();
  };

  // create context value
  const contextValue = {
    user,
    signOut,
    changePassword,
    deleteAccount,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
