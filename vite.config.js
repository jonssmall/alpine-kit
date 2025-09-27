import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'

// Custom Handlebars helpers
const handlebarsHelpers = {
  uppercase: (str) => str.toUpperCase(),
  formatDate: (date) => new Date(date).toLocaleDateString(),
  eq: (a, b) => a === b,
  or: (a, b) => a || b
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  assetsInclude: ['**/*.xml', '**/*.txt'],
  plugins: [
    handlebars({
      partialDirectory: './partials',
      context: (pagePath) => {
        // Base context for all pages
        const baseContext = {
          
          // Site Information
          title: 'Alpine Kit',
          description: 'TBD',
          author: 'Jon Small',
          year: new Date().getFullYear(),
          version: '1.0.0',
          environment: 'development',
          
          // SEO Variables
          siteUrl: 'https://jonssmall.github.io/alpine-kit/',
          canonical_path: '',
        };

        // Default context for homepage
        return {
          ...baseContext,
          canonical_path: ''
        };
      },
      helpers: handlebarsHelpers
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  }
})
