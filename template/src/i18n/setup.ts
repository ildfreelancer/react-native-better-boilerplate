import i18n from 'i18next'
import RNLocalize from 'react-native-localize'
import en from './translations/en.json'
import { I18nManager } from 'react-native'
import { initReactI18next } from 'react-i18next'
import 'intl-pluralrules'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DEFAULT_RTL = false
const DEFAULT_LOCALE = 'en'

const LANGUAGES = {
  en: {
    translation: en,
  },
}

const LANG_CODES = Object.keys(LANGUAGES)
const defaultLanguage = { languageTag: DEFAULT_LOCALE, isRTL: DEFAULT_RTL }

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('locale', (err, language) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from AsyncStorage ', err)
        } else {
          console.log('No language is set, choosing English as fallback')
        }
        const { languageTag, isRTL } =
          RNLocalize.findBestAvailableLanguage(LANG_CODES) || defaultLanguage
        // update layout direction
        I18nManager.forceRTL(isRTL)
        callback(languageTag)
        return
      }
      callback(language)
    })
  },
  init: () => {
    //
  },
  cacheUserLanguage: language => {
    AsyncStorage.setItem('locale', language)
  },
}

export const setI18nConfig = () => {
  // clear translation cache
  try {
    i18n
      // detect language
      .use(LANGUAGE_DETECTOR as any)
      // pass the i18n instance to react-i18next.
      .use(initReactI18next)
      // set options
      .init({
        resources: LANGUAGES,
        react: {
          useSuspense: false,
        },
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      })
  } catch (error) { }
}

export const getLocale = () => {
  // fallback if no available language fits
  const { languageTag } = RNLocalize.findBestAvailableLanguage(LANG_CODES) || defaultLanguage
  return languageTag
}
