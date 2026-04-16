import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  build: {
    /* Image optimization settings */
    rollupOptions: {
      output: {
        manualChunks: {
          /* Code splitting per performance */
          'vendor': ['react', 'react-dom'],
          'animations': ['framer-motion', 'gsap'],
          'router': ['react-router-dom'],
        }
      }
    },
    
    /* Compress images during build */
    assetsInlineLimit: 4096, /* Inline assets < 4KB */
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, /* Remove console.log in production */
      }
    }
  },

  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@ui':         path.resolve(__dirname, './src/components/ui'),
      '@sections':   path.resolve(__dirname, './src/components/sections'),
      '@layout':     path.resolve(__dirname, './src/components/layout'),
      '@context':    path.resolve(__dirname, './src/context'),
      '@data':       path.resolve(__dirname, './src/data'),
      '@styles':     path.resolve(__dirname, './src/styles'),
      '@hooks':      path.resolve(__dirname, './src/hooks'),
      '@utils':      path.resolve(__dirname, './src/utils'),
    },
  },
});
