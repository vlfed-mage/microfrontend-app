import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

const DASHBOARD_PORT = 8083 as const;
const isDeployment = !!process.env.CI;

export default defineConfig({
  base: isDeployment ? '/dashboard/latest/' : '/',
  plugins: [
    vue(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
  },
  preview: {
    port: DASHBOARD_PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  server: {
    port: DASHBOARD_PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
