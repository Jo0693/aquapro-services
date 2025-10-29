import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frCommon from '../locales/fr/common.json';
import enCommon from '../locales/en/common.json';

const resources = {
  fr: {
    common: frCommon
  },
  en: {
    common: enCommon
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
