import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import sq from '@/locales/sq.json';
import geo from '@/locales/geo.json';
import br from '@/locales/br.json';

const resources = {
    en: { translation: en },
    es: { translation: es },
    sq: { translation: sq },
    geo: { translation: geo },
    br: { translation: br },
};

// Get saved language from localStorage or device locale
const getSavedLanguage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('appLanguage');
        if (saved) return saved;
    }
    // Fall back to device locale
    const deviceLang = Localization.getLocales()[0]?.languageCode || 'en';
    return resources[deviceLang as keyof typeof resources] ? deviceLang : 'en';
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;
