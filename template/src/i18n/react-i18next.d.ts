// import the original type declarations
import 'react-i18next'
// import all namespaces (for the default language, only)
import en from './translations/en.json'

declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: ''
    // custom resources type
    resources: {
      en: typeof en
    }
  }
}
