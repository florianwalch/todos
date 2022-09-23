import { createRoot } from 'react-dom/client';

import Amplify from '@aws-amplify/core';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { App } from './app';

// configure amplify
Amplify.configure(awsExports);

// app entry point
(function () {
  // render react app
  const renderApp = () => {
    const container = document.getElementById('app');

    if (container != null) {
      const root = createRoot(container);
      root.render(<App />);
    }
  };

  const readyState = document.readyState;
  // if document is ready, call resolve
  if (readyState === 'complete' || readyState === 'interactive') {
    renderApp();
  } else {
    // otherwise, wait for dom content to be loaded
    const domLoadedHandler = () => {
      document.removeEventListener('DOMContentLoaded', domLoadedHandler);
      renderApp();
    };

    document.addEventListener('DOMContentLoaded', domLoadedHandler);
  }
})();
