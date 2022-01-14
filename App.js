import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import db from './config';
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import { AppTabNavigator } from './components/AppTabNavigator';

export default function App() {
  return <AppContainer />;
}
const switchNavigator = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  Signup: { screen: SignUpScreen },
  LoginScreen: { screen: LoginScreen },
  Home: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
