import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// const port = import.meta.env.VITE_PORT
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    host: true,
    port: 1234, //80
  },
});
