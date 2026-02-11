import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

declare module '@originjs/vite-plugin-federation' {
  interface SharedConfig {
    singleton?: boolean;
  }
}

const AUTH_PORT = 8082 as const;
const isDeployment = !!process.env.CI;

export default defineConfig({
  base: isDeployment ? '/auth/latest/' : '/',
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
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
        '@mui/material': {
          singleton: true,
          requiredVersion: '^5.14.20',
        },
        '@emotion/react': {
          singleton: true,
          requiredVersion: '^11.11.1',
        },
        '@emotion/styled': {
          singleton: true,
          requiredVersion: '^11.11.0',
        },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: AUTH_PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  server: {
    port: AUTH_PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
