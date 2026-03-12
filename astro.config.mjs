import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://daneshmishra.co.uk',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  build: {
    // Inline small stylesheets to reduce HTTP requests
    inlineStylesheets: 'auto',
    // Astro minifies CSS and JS in production by default (esbuild)
  },
  // Compress HTML output in production builds
  compressHTML: true,
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
