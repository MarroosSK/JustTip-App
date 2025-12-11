import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/translation.json";
import sk from "../locales/sk/translation.json";

const resources = {
  en: { translation: en },
  sk: { translation: sk },
};

// Choose  language
const getLanguage = (): "en" | "sk" => {
  const locales = Localization.getLocales();
  const primary = locales[0]?.languageCode?.toLowerCase();

  return primary === "sk" ? "sk" : "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
