import { lazy, StrictMode, Suspense } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

import { Loader } from '@/components/Loader/Loader';

const AuthenticatedApp = lazy(async () => ({
  default: (
    await import(
      /* webpackChunkName: "AuthenticatedApp" */ '@/authenticated-app'
    )
  ).AuthenticatedApp,
}));

/**
 * Helper to enable/disable strict mode.
 *
 * @param children - app to render
 * @param strictModeEnabled - turn on/off strict mode
 */
function withStrictMode(children: JSX.Element, strictModeEnabled = true) {
  if (!strictModeEnabled) {
    return children;
  } else {
    return <StrictMode>{children}</StrictMode>;
  }
}

/**
 * Render app with contexts & routes.
 */
export function App() {
  return withStrictMode(
    <Authenticator>
      {({ signOut, user }) => (
        <Suspense fallback={<Loader />}>
          <AuthenticatedApp user={user} signOut={signOut} />
        </Suspense>
      )}
    </Authenticator>,
    true,
  );
}
