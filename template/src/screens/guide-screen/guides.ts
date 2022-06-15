export default {
  path: `
  This project is using [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) and manually configuration for **tsconfig.json**
  to support absolute path.

  **How it works**

  \`\`\` js
  // Use this:
  import HomeScreen from '@screen/home-screen';

  // Instead of that:
  import HomeScreen from '../screen/home-screen';
  \`\`\`

  **List of default supports**

  \`\`\`
  @lib
  @assets
  @components
  @constants
  @i18n
  @navigation
  @screens
  @services
  @styles
  @utils
  @state
  @contexts
  @hooks
  @hocs
  @config
  @providers
  @fixtures
  @seeds
  \`\`\`


  **How to add more customize paths**
  For example, you create new folder under **src** folder named: **sample**
  
  #1 add this line into **.babel.config.js** file

  \`\`\` js
  ...
  [
    'module-resolver',
    {
      ...
      alias: {
        ...
        '@sample': './src/sample',
      },
    },
  ],
  \`\`\`


  #2 add this line into **tsconfig.json** file (This file is using for IDE which supports Typescript)

  \`\`\` js
  ...
  "paths": {
    ...
    "@sample/*": ["src/sample/*"]
  },
  \`\`\`

  #3 Reset Cache
  In order to apply new changes, you have to close metro terminal and reset metro cache.
  Run this command:

  \`\`\`
  yarn start --reset-cache
  \`\`\`

  #4 Usage:
  For example, you want to access test.json file inside sample folder

  \`\`\`
  src
  --sample
    |---test.json
  \`\`\`

  Use this
  \`\`\` js
  import test from '@sample/test.json';
  \`\`\`

 `,
  i18n: `
  This project is set up to support multiple languages powered by [react-i18next](https://github.com/i18next/react-i18next) and [react-native-localize](https://github.com/zoontek/react-native-localize)

  **How to use**
  Default the template support english.
  Add new slug/text inside **src/i18n/translations/en.json**
  For example,

  \`\`\`
  ...
    "support_multiple_languages": "Support Multiple Languages"
  ...
  \`\`\`

  To use
  \`\`\` js
  import { useTranslation} from 'react-i18next';

  ...
  const { t } = useTranslation()

  <Text>{t('support_multiple_languages')}<Text/>
  ...
  \`\`\`

  **How to add more languages**
  For example, you want to add new Spanish language, create new file **src/i18n/translations/es.json**
  
  In order to change language

  \`\`\` js
  import { useTranslation} from 'react-i18next';

  ...
  const { i18n } = useTranslation()

  await i18n.changeLanguage('es')
  ...
  \`\`\`
  
  More details: [react-i18next](https://github.com/i18next/react-i18next)
  `,
  fonts: `
  By default, this project uses **Poppins**. However, you can add any custom fonts you want.

  **How to use**
  First, make sure you manually remove all current fonts which you don't use anymore.

  1. Manually delete Poppins fonts in **Resources** folder (open by Xcode), make sure **Info.plist** clean
  2. Manually delete Poppins fonts in **android/app/src/main/assets/fonts**
  3. Manually delete Poppins fonts in **src/assets/fonts**
  4. Add new custom fonts you want to use inside: **src/assets/fonts**
  5. Link fonts to both platform
  Run this command line:
  \`\`\`bash
    npx react-native link
  \`\`\`
  6. Change font name inside **src/styles/typography.ts**

  **Troubleshooting**
  If you got the issue duplicate command with fonts from **react-native-vector-icons**, go to **Build Phases** > **Copy Resources and Images** > Remove all fonts from **react-native-vector-icons**
  Then rerun project again.
  `,
  responsive: `
  With help of [react-native-size-matters](https://github.com/nirsky/react-native-size-matters), we forked a Typescript version of this package and self-hosted at **lib** folder
  The main purpose of this package is to support responsive across of device resolutions.
  
  To do this, we use some utilities from **@lib/react-native-size-matters**,
  such as, if we want horizontal scale: using **s**
  if we want vertical scale: using **vs**
  if we want linear scale: using **mvs**

  Try the magic, when you open the smaller devices like: iphone 5, iphone 6, ...

  **Tip**
  Keep in mind that use hardcoded pixel wisely, it will break the layout on small screen if you overuse it.

  More information how to use these utilities, check out [react-native-size-matters](https://github.com/nirsky/react-native-size-matters)
  `,
  components: `
  The guideline is in progress...
  Open [new issue](https://github.com/ildfreelancer/react-native-better-boilerplate/issues) if you want to know more sooner.
  `,
  theme: `
  The guideline is in progress...
  Open [new issue](https://github.com/ildfreelancer/react-native-better-boilerplate/issues) if you want to know more sooner.
  `,
  dark_mode: `
  The guideline is in progress...
  Open [new issue](https://github.com/ildfreelancer/react-native-better-boilerplate/issues) if you want to know more sooner.
  `,
  services: `
  The guideline is in progress...
  Open [new issue](https://github.com/ildfreelancer/react-native-better-boilerplate/issues) if you want to know more sooner.
  `,
  tips_and_tricks: `
  The guideline is in progress...
  Open [new issue](https://github.com/ildfreelancer/react-native-better-boilerplate/issues) if you want to know more sooner.
  `,
}
