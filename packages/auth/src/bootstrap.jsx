import React from 'react';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath, createRoot }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen((update) => {
      onNavigate({ pathname: update.location.pathname });
    });
  }

  const root = createRoot(el);
  root.render(<App onSignIn={onSignIn} history={history} />);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

const standaloneRoot = document.querySelector('#_auth-dev-root');

if (standaloneRoot) {
  const { createRoot } = await import('react-dom/client');
  const history = createBrowserHistory();

  if (history.location.pathname === '/') {
    history.replace('/auth/signin');
  }

  mount(standaloneRoot, { defaultHistory: history, createRoot });
}

export { mount };
