import i18n from 'i18next'; 
import {initReactI18next} from 'react-i18next'; 
import en from './languages/en.json'; 
import vi from './languages/vi.json'; 
import zh from './languages/zh.json'; 
import ja from './languages/ja.json'; 
  
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: en,
      vi: vi,
      zh: zh,
      ja: ja,
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
  
export default i18n; 