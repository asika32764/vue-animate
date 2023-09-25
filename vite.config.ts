import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('./docs'),
      '@src': resolve('./src'),
    },
  },
  build: {
    lib: {
      formats: ['es'],
      entry: resolve('src/index.ts'),
      name: 'vue-animate'
    }
  },
  plugins: [
    vue()
  ],
})
