import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { sortBy } from 'lodash';
import { initReactI18next } from 'react-i18next';
import { FALLBACK_LANGUAGE } from './../../utils/constants';

type LanguageOption = {
  value: string;
  label: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = sortBy(
  [
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' },
  ],
  ['label']
);

export const getLocalizedUrl = (currentUrl: string, currLanguage: string, newLanguage: string) => {
  const currentLangPath = `/${currLanguage}`;
  if (currentUrl.indexOf(currentLangPath) !== -1) {
    return currentUrl.replace(currentLangPath, `/${newLanguage}`);
  } else {
    return currentUrl;
  }
};

export const getLocalizedPath = (path: string | undefined, language: string) => {
  return `/${language}${path && path.indexOf('/') === 0 ? '' : '/'}${path || ''}`;
};

export const changeLanguage = async (history: any, language: string) => {
  if (language !== i18n.language) {
    const { pathname, search } = history.location;
    const newUrl = getLocalizedUrl(`${pathname}${search}`, i18n.language, language);
    await i18n.changeLanguage(language);
    history.push(newUrl);
  }
};

const options = {
  detection: {
    order: ['path', 'localStorage', 'navigator'],
  },
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: FALLBACK_LANGUAGE,
  whitelist: LANGUAGE_OPTIONS.map((option) => option.value),
  react: {
    useSuspense: true,
  },
};

i18n
  .use(Backend) // load translations from /public/locales
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
