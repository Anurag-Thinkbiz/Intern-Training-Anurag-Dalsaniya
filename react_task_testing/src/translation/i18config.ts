import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/en.json";
import hi from "./hi/hi.json";

const currentLanguageFromLocalstorage = JSON.parse(
  localStorage.getItem("persist:root") as string
);
let currentLanguage;
if (currentLanguageFromLocalstorage) {
  currentLanguage = JSON.parse(
    currentLanguageFromLocalstorage.language
  ).language;
}

i18n.use(initReactI18next).init({
  lng: currentLanguage,
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
  },
});
export default i18n;