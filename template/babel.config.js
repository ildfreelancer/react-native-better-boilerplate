module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@lib': './lib',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@i18n': './src/i18n',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@state': './src/state',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@hocs': './src/hocs',
          '@config': './src/config',
          '@seeds': './src/seeds',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}

