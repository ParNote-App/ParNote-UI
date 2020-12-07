import { init, getLocaleFromNavigator, addMessages } from "svelte-i18n";

import EN from "../lang/en.json";
import TR from "../lang/tr.json";
import DE from "../lang/de.json";
import RU from "../lang/ru.json";
import HU from "../lang/hu.json";

addMessages("en", EN);
addMessages("tr", TR);
addMessages("de", DE);
addMessages("ru", RU);
addMessages("hu", HU);

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
