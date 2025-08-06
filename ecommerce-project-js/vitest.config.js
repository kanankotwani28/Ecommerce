import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // used to run integration test and unit test
    setupFiles: './setupTests.js',
    //runs code in this file befor eof other test
  }
});