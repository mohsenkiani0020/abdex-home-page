// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // Add your custom plugins here
      ],
    },
  },
  root: 'src', // Your source files will be loaded from the "src" directory
  build: {
    // rollupOptions: {
    //   external: ['/assets/index-uTltoeJh.js']
    // },
    // Empty the outDir before building
    emptyOutDir: false,
    outDir: './../public', // The build output will be saved to the "dist" directory
    // more build options...
  },
  // other global options...
});