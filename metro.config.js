const path = require('node:path')
const { getDefaultConfig } = require('expo/metro-config')
const { generate } = require('@storybook/react-native/scripts/generate')
const { withNativeWind } = require('nativewind/metro')

generate({
  configPath: path.resolve(__dirname, './.storybook'),
  useJs: true,
})

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.transformer.unstable_allowRequireContext = true

module.exports = withNativeWind(defaultConfig, { input: './global.css' })
