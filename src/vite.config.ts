import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  cacheDir: path.resolve(import.meta.dirname, 'tmp/vite-cache'),
  plugins: [RubyPlugin(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'app/javascript'),
    },
  },
});
