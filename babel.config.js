module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@navigators': './src/navigators',
          '@constants': './src/constants',
          '@components': './src/components',
          '@screens': './src/screens',
        },
      },
    ],
  ],
};
