import React from 'react';
import {View} from 'react-native';
import Landing from './Landing';
import Authenticate from './Authenticate';
import Home from './Home';
import User from './User';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

const MainTabs = createBottomTabNavigator({
  Home: Home,
  User: User,
});
const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
});
const HomeStack = createStackNavigator(
  {
    HomePage: MainDrawer,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
const AuthStack = createStackNavigator(
  {
    LandingPage: {
      screen: Landing,
    },
    AuthenticatePage: {
      screen: Authenticate,
    },
    // DriversLicenseScanPage: {
    //   screen: DriversLicenseScan,
    // },
  },
  {
    initialRouteName: 'LandingPage',
  },
);
const RootSwitch = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  HomePage: HomeStack,
});
const MainContainer = createAppContainer(RootSwitch);

const Main = () => {
  return (
    <View style={{flex: 1}}>
      <MainContainer />
    </View>
  );
};

export default Main;
