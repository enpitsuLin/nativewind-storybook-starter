/* eslint-disable node/prefer-global/process */

export default ({ config }) => /** @type {import('expo/config').ExpoConfig} */({
  ...config,
  name: 'Storybook Tutorial Template',
  slug: 'storybook-tutorial-template',
  userInterfaceStyle: 'automatic',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  plugins: [
    'expo-router',
  ],
})
