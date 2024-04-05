// vite.config.js
import { defineConfig } from "file:///C:/Develop/Private/Projects/pwa-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Develop/Private/Projects/pwa-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Develop/Private/Projects/pwa-app/node_modules/vite-plugin-pwa/dist/index.mjs";
import mkcert from "file:///C:/Develop/Private/Projects/pwa-app/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";

// manifest.json
var manifest_default = {
  id: "/",
  scope: "/",
  name: "App Acino",
  display: "standalone",
  start_url: "/",
  short_name: "Acino",
  theme_color: "#FFFFFF",
  description: "App Acino portafolio",
  orientation: "any",
  background_color: "#FFFFFF",
  related_applications: [],
  prefer_related_applications: false,
  display_override: ["window-controls-overlay"],
  icons: [
    {
      src: "assets/icons/512x512.png",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "assets/icons/192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "assets/icons/48x48.png",
      sizes: "48x48",
      type: "image/png"
    },
    {
      src: "assets/icons/24x24.png",
      sizes: "24x24",
      type: "image/png"
    }
  ],
  features: [
    "Cross Platform",
    "fast",
    "simple"
  ],
  categories: [
    "social"
  ],
  shortcuts: []
};

// vite.config.js
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: manifest_default,
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
        runtimeCaching: [{
          urlPattern: new RegExp("^https://api.app-acino.com/"),
          handler: "NetworkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXERldmVsb3BcXFxcUHJpdmF0ZVxcXFxQcm9qZWN0c1xcXFxwd2EtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxEZXZlbG9wXFxcXFByaXZhdGVcXFxcUHJvamVjdHNcXFxccHdhLWFwcFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovRGV2ZWxvcC9Qcml2YXRlL1Byb2plY3RzL3B3YS1hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCdcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuanNvbic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIG1hbmlmZXN0LFxuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uc3ZnJywgJ2Zhdmljb24uaWNvJywgJ3JvYm90cy50eHQnLCAnYXBwbGUtdG91Y2gtaWNvbi5wbmcnXSxcbiAgICAgIC8vIHN3aXRjaCB0byBcInRydWVcIiB0byBlbmFibGUgc3cgb24gZGV2ZWxvcG1lbnRcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWx9JywgJyoqLyoue3N2ZyxwbmcsanBnLGdpZn0nXSxcbiAgICAgICAgcnVudGltZUNhY2hpbmc6IFt7XG4gICAgICAgICAgdXJsUGF0dGVybjogbmV3IFJlZ0V4cCgnXmh0dHBzOi8vYXBpLmFwcC1hY2luby5jb20vJyksXG4gICAgICAgICAgaGFuZGxlcjogJ05ldHdvcmtGaXJzdCcsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgbmV0d29ya1RpbWVvdXRTZWNvbmRzOiAyMCxcbiAgICAgICAgICAgICAgY2FjaGVOYW1lOiAnYXBpLWNhY2hlJyxcbiAgICAgICAgICAgICAgY2FjaGVhYmxlUmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbMCwgMjAwXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgfV1cbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuIiwgIntcclxuICBcImlkXCI6IFwiL1wiLFxyXG4gIFwic2NvcGVcIjogXCIvXCIsXHJcbiAgXCJuYW1lXCI6IFwiQXBwIEFjaW5vXCIsXHJcbiAgXCJkaXNwbGF5XCI6IFwic3RhbmRhbG9uZVwiLFxyXG4gIFwic3RhcnRfdXJsXCI6IFwiL1wiLFxyXG4gIFwic2hvcnRfbmFtZVwiOiBcIkFjaW5vXCIsXHJcbiAgXCJ0aGVtZV9jb2xvclwiOiBcIiNGRkZGRkZcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiQXBwIEFjaW5vIHBvcnRhZm9saW9cIixcclxuICBcIm9yaWVudGF0aW9uXCI6IFwiYW55XCIsXHJcbiAgXCJiYWNrZ3JvdW5kX2NvbG9yXCI6IFwiI0ZGRkZGRlwiLFxyXG4gIFwicmVsYXRlZF9hcHBsaWNhdGlvbnNcIjogW10sXHJcbiAgXCJwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnNcIjogZmFsc2UsXHJcbiAgXCJkaXNwbGF5X292ZXJyaWRlXCI6IFtcIndpbmRvdy1jb250cm9scy1vdmVybGF5XCJdLFxyXG4gIFwiaWNvbnNcIjogW1xyXG4gICAge1xyXG4gICAgICBcInNyY1wiOiBcImFzc2V0cy9pY29ucy81MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxyXG4gICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJzcmNcIjogXCJhc3NldHMvaWNvbnMvMTkyeDE5Mi5wbmdcIixcclxuICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwic3JjXCI6IFwiYXNzZXRzL2ljb25zLzQ4eDQ4LnBuZ1wiLFxyXG4gICAgICBcInNpemVzXCI6IFwiNDh4NDhcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwic3JjXCI6IFwiYXNzZXRzL2ljb25zLzI0eDI0LnBuZ1wiLFxyXG4gICAgICBcInNpemVzXCI6IFwiMjR4MjRcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcclxuICAgIH1cclxuICBdLFxyXG4gIFwiZmVhdHVyZXNcIjogW1xyXG4gICAgXCJDcm9zcyBQbGF0Zm9ybVwiLFxyXG4gICAgXCJmYXN0XCIsXHJcbiAgICBcInNpbXBsZVwiXHJcbiAgXSxcclxuICBcImNhdGVnb3JpZXNcIjogW1xyXG4gICAgXCJzb2NpYWxcIlxyXG4gIF0sXHJcbiAgXCJzaG9ydGN1dHNcIjogW1xyXG4gIF1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFTLFNBQVMsb0JBQW9CO0FBQ2xVLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxZQUFZOzs7QUNIbkI7QUFBQSxFQUNFLElBQU07QUFBQSxFQUNOLE9BQVM7QUFBQSxFQUNULE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLFdBQWE7QUFBQSxFQUNiLFlBQWM7QUFBQSxFQUNkLGFBQWU7QUFBQSxFQUNmLGFBQWU7QUFBQSxFQUNmLGFBQWU7QUFBQSxFQUNmLGtCQUFvQjtBQUFBLEVBQ3BCLHNCQUF3QixDQUFDO0FBQUEsRUFDekIsNkJBQStCO0FBQUEsRUFDL0Isa0JBQW9CLENBQUMseUJBQXlCO0FBQUEsRUFDOUMsT0FBUztBQUFBLElBQ1A7QUFBQSxNQUNFLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBTztBQUFBLE1BQ1AsT0FBUztBQUFBLE1BQ1QsTUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsVUFBWTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQWM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBYSxDQUNiO0FBQ0Y7OztBRHRDQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsZUFBZSxDQUFDLGVBQWUsZUFBZSxjQUFjLHNCQUFzQjtBQUFBO0FBQUEsTUFFbEYsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxzQkFBc0Isd0JBQXdCO0FBQUEsUUFDN0QsZ0JBQWdCLENBQUM7QUFBQSxVQUNmLFlBQVksSUFBSSxPQUFPLDZCQUE2QjtBQUFBLFVBQ3BELFNBQVM7QUFBQSxVQUNMLFNBQVM7QUFBQSxZQUNULHVCQUF1QjtBQUFBLFlBQ3ZCLFdBQVc7QUFBQSxZQUNYLG1CQUFtQjtBQUFBLGNBQ2YsVUFBVSxDQUFDLEdBQUcsR0FBRztBQUFBLFlBQ3JCO0FBQUEsVUFDSjtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0Q7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
