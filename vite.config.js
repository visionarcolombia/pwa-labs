import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert'

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        runtimeCaching: [{
          urlPattern: new RegExp('^https://api.app-acino.com/'),
          handler: 'NetworkFirst',
              options: {
              networkTimeoutSeconds: 60,
              cacheName: 'api-cache',
              cacheableResponse: {
                  statuses: [0, 200],
              },
          },
      }]
      },
    }),
  ],
})
