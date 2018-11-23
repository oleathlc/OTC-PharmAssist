import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, BottomTabBar } from 'react-navigation';

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
    tabBarOptions: {
      style: {
        backgroundColor: '#d8d8d8',
        },
      labelStyle: {
        fontSize: 12,
        color: '#54B864',
        }
      },
    tabBarIcon: ({ focused }) => (
      focused ?
      <Image
        style={{height:26}}
        source={require('../assets/images/home2.png')}
        resizeMode='contain'
        />
        :
        <Image
        style={{height:26}}
        source={require('../assets/images/home1.png')}
        resizeMode='contain'
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
  tabBarOptions: {
    style: {
      backgroundColor: '#d8d8d8',
      },
    labelStyle: {
      fontSize: 12,
      color: '#54B864',
      }
    },
  tabBarIcon: ({focused}) => (
    focused ?
    <Image
      style={{height:26}}
      source={require('../assets/images/cameragreen.png')}
      resizeMode='contain'
      />
      :
      <Image
      style={{height:26}}
      source={require('../assets/images/camerawhite.png')}
      resizeMode='contain'
      />
      )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: {
    style: {
      backgroundColor: '#d8d8d8',
      },
    labelStyle: {
      fontSize: 12,
      color: '#54B864',
      }
    },
    tabBarIcon: ({focused}) => (
      focused ?
      <Image
        style={{height:26}}
        source={require('../assets/images/settings.png')}
        resizeMode='contain'
        />
        :
        <Image
        style={{height:26}}
        source={require('../assets/images/settings2.png')}
        resizeMode='contain'
        />
        )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
