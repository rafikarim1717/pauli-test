import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // No need to include PostCSS if you're not using it
  css: {
    // You can specify global CSS files here if you want
    // Example:
    // preprocessorOptions: {
    //   css: {
    //     additionalData: '@import "./src/styles.css";' // If you want to include global styles in every component
    //   }
    // }
  }
});
