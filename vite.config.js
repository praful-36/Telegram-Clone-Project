import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Telegram-clone-project/'  // Replace 'your-repo-name' with your actual repo name
});
