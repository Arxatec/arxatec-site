// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config

const locales = ['en', 'es', 'qu'];
export default defineConfig({

  integrations: [tailwind(), react(), 
    sitemap({
      serialize: (entry) => {
        const path = new URL(entry.url).pathname;

        return {
          url: entry.url,
          links: locales.map((lang) => ({
            lang,
            url: `https://arxatec.net/${lang}${path === '/' ? '' : path}`,
          })),
        };
      },
    }),  
  ],

  site: "https://arxatec.net",

  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "qu"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: vercel(),
});