import * as React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Settings from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import AddAnnouncements from '../screens/AddAnnouncements';
import SocietyComplaints from '../screens/SocietyComplaints';
import ViewComplaint from '../screens/ViewComplaint';
import HelperScreen from '../screens/HelperScreen'
import AddHelper from '../screens/AddHelper'
import ViewAnnouncements from '../screens/ViewAnnouncement'
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: { headerShown: false },
    },
    AddAnnouncements: {
      screen: AddAnnouncements,
      navigationOptions: { headerShown: false },
    },
    ViewAnnouncements: {
      screen: ViewAnnouncements,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
 const HelperStack = createStackNavigator(
  {
    HelperScreen: {
      screen: HelperScreen,
      navigationOptions: { headerShown: false },
    },
    AddHelper: {
      screen: AddHelper,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'HelperScreen',
  }
);
export const ComplaintStack = createStackNavigator(
  {
    SocietyComplaints: {
      screen: SocietyComplaints,
      navigationOptions: { headerShown: false },
    },
    ViewComplaint: {
      screen: ViewComplaint,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: 'SocietyComplaints',
  }
);

export const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="home" size={30} color={tintColor}></Ionicons>
        </View>
      ),
      tabBarOptions: { activeTintColor: '#2A299A', inactiveTintColor: 'gray' },
      tabBarLabel: 'Dashboard',
    },
  },
  Complaints: {
    screen: ComplaintStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="help-circle" size={30} color={tintColor}></Ionicons>
        </View>
      ),
      tabBarOptions: { activeTintColor: '#2A299A', inactiveTintColor: 'gray' },
      tabBarLabel: 'Complaints',
    },
  },

    Helpers: {
    screen: HelperStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Ionicons name="people" size={30} color={tintColor}></Ionicons>
        </View>
      ),
      tabBarOptions: { activeTintColor: '#2A299A', inactiveTintColor: 'gray' },
      tabBarLabel: 'Helpers',
    },
  },
  Profile: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Feather name="user" size={30} color={tintColor} />
        </View>
      ),
      tabBarOptions: { activeTintColor: '#2A299A', inactiveTintColor: 'gray' },
      tabBarLabel: 'Settings',
    },
  },
});



