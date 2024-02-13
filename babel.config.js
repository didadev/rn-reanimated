module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src/'],
          alias: [
            {'moti/skeleton': 'moti/skeleton/react-native-linear-gradient'},
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
