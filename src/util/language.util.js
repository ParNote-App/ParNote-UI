import { init, addMessages, locale, getLocaleFromNavigator } from "svelte-i18n";
import { get } from "svelte/store";

import EN from "../lang/en.json";
import TR from "../lang/tr.json";
import DE from "../lang/de.json";
import RU from "../lang/ru.json";
import HU from "../lang/hu.json";

const languages = {
  tr: TR,
  en: EN,
  de: DE,
  ru: RU,
  hu: HU,
};

Object.keys(languages).forEach((lang) => {
  addMessages(lang, languages[lang]);
});

export function convertLocale(currentLocale = get(locale)) {
  let lang = "en";

  Object.keys(languages).forEach((langKey) => {
    if (currentLocale.toLowerCase().startsWith(langKey)) lang = langKey;
  });

  return lang;
}

init({
  fallbackLocale: "en",
  initialLocale: convertLocale(getLocaleFromNavigator()),
});
