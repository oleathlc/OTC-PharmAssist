import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AlertScreen from '../screens/AlertScreen';
import camera from '../assets/images/camera.png';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Alerts: {
    screen:AlertScreen,
    navigationOptions:({
      headerLeft:null,
    }),
  },
});
HomeStack.navigationOptions = ({navigation})=> {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };
  if (routeName === 'Alerts') {
  navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({focused}) => (
    focused ?
    <Image
      style={{height:26}}
      source={require('../assets/images/camerablue.jpg')}
      resizeMode='contain'
      />
      :
      <Image
      style={{height:26}}
      source={require('../assets/images/camerawhite.jpg')}
      resizeMode='contain'
      />
      )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
