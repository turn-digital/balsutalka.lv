import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import image from "@astrojs/image";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "http://turn.turn.lv/",
  // base: "/astro-turn",
  integrations: [
    astroI18next(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    react(),
  ],
});
