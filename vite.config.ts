import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@api': path.resolve('./src/api'),
      '@components': path.resolve('./src/components'),
      '@config': path.resolve('./src/config'),
      '@globalTypes': path.resolve('./src/globalTypes'),
      '@helpers': path.resolve('./src/helpers'),
      '@hooks': path.resolve('./src/hooks'),
      '@intl': path.resolve('./src/intl'),
      '@lib': path.resolve('./src/lib'),
      '@pages': path.resolve('./src/pages'),
      '@style': path.resolve('./src/style'),
    }
  }
})
