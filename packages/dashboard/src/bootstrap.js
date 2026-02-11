import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately
const standaloneRoot = document.querySelector('#_dashboard-dev-root');

if (standaloneRoot) {
  mount(standaloneRoot);
}

// We are running through container
// and we should export the mount function
export { mount };
