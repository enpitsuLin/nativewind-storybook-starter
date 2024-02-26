import Constants from 'expo-constants'
import { renderRootComponent } from 'expo-router/build/renderRootComponent'
import './global.css'

if (Constants.expoConfig.extra.storybookEnabled === 'true')
  renderRootComponent(require('./.storybook').default)
else
  renderRootComponent(require('expo-router/build/qualified-entry').App)
