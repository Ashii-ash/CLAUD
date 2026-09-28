// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://texntailor.ae',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/thanks') && !page.includes('/404'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
