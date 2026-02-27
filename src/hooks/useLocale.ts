import { enUS, fr } from "date-fns/locale";
import i18n from "./../i18n";
import * as Localization from "expo-localization";

export const usePhoneLocale = () => {
  const locales = Localization.useLocales();
  const lang = locales[0].languageCode;
  const dateFnsLocales = { enUS, fr };
  let chosenDateLocal = enUS;
  if (lang == "fr") {
    chosenDateLocal = dateFnsLocales.fr;
  }

  const init = () => {
    i18n.changeLanguage(lang ?? "en");
  };

  return { init, lang, localeDate: chosenDateLocal };
};
