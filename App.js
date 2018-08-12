import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SplashScreen from './SplashScreen';
import GameScreen from './GameScreen';
import MenuScreen from './MenuScreen';
import HowScreen from './HowScreen';

const RootStack = createStackNavigator(
  {
    Splash: {
      screen:SplashScreen,
      navigationOptions: () => ({
        gesturesEnabled: false
      })
    },
    Menu: {
      screen: MenuScreen,
      navigationOptions: () => ({
        gesturesEnabled: false
      })
    },
    How: HowScreen,
    Game: GameScreen,
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
    gesturesEnabled: false
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
