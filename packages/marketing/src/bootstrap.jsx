import React from 'react';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory, initialPath, createRoot }) => {
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
  root.render(<App history={history} />);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

const standaloneRoot = document.querySelector('#_marketing-dev-root');

if (standaloneRoot) {
  const { createRoot } = await import('react-dom/client');
  mount(standaloneRoot, { defaultHistory: createBrowserHistory(), createRoot });
}

export { mount };
