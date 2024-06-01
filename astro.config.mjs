import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'server',
  adapter: vercel(),
});
