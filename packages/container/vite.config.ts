import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

declare module '@originjs/vite-plugin-federation' {
  interface SharedConfig {
    singleton?: boolean;
  }
}

const CONTAINER_PORT = 8080 as const;

const isDeployment = !!process.env.CI;
const productionDomain = process.env.PRODUCTION_DOMAIN ?? '';

const MARKETING_DEV_URL = 'http://localhost:8081/assets/remoteEntry.js' as const;
const AUTH_DEV_URL = 'http://localhost:8082/assets/remoteEntry.js' as const;
const DASHBOARD_DEV_URL = 'http://localhost:8083/assets/remoteEntry.js' as const;

const marketingRemoteUrl = isDeployment
  ? `${productionDomain}/marketing/latest/assets/remoteEntry.js`
  : MARKETING_DEV_URL;

const authRemoteUrl = isDeployment
  ? `${productionDomain}/auth/latest/assets/remoteEntry.js`
  : AUTH_DEV_URL;

const dashboardRemoteUrl = isDeployment
  ? `${productionDomain}/dashboard/latest/assets/remoteEntry.js`
  : DASHBOARD_DEV_URL;

export default defineConfig({
  base: isDeployment ? '/container/latest/' : '/',
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        marketing: marketingRemoteUrl,
        auth: authRemoteUrl,
        dashboard: dashboardRemoteUrl,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.0.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.20.1',
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: CONTAINER_PORT,
    strictPort: true,
  },
  preview: {
    port: CONTAINER_PORT,
    strictPort: true,
  },
});
