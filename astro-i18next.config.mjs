/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: "lv",
  locales: ["lv", "ltg"],
  routes: {
    lv: {
      index: "",
    },
    ltg: {
      index: "ltg",
    },
  },
  load: ["server", "client"],
  i18nextServerPlugins: {
    "{initReactI18next}": "react-i18next",
  },
  i18nextClientPlugins: {
    "{initReactI18next}": "react-i18next",
  }
};
