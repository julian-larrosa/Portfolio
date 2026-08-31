import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/Portfolio/',
  build: {
    target: 'esnext',
    outDir: '../dist',
    emptyOutDir: true,
  },
})
