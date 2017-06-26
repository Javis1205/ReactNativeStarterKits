/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  AppRegistry,
} from 'react-native'
import crashlytics from 'react-native-fabric-crashlytics'

import Novame from './ui'
crashlytics.init()
// registry
AppRegistry.registerComponent('Novame', () => Novame)