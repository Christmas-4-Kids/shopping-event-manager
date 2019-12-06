import React from 'react';
import {View} from 'react-native';
import Landing from './Landing';
import Authenticate from './Authenticate';
import CheckIn from './CheckIn';
import DriversLicenseScan from './DriversLicenseScan';
import Rules from './Rules';
import Home from './Home';
import UserEdit from './UserEdit';
import UserInfo from './UserInfo';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

const MainTabs = createBottomTabNavigator({
  Home: Home,
  User: UserInfo,
});
const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
});
const HomeStack = createStackNavigator(
  {
    HomePage: MainDrawer,
    CheckInPage: {screen: CheckIn},
    DriversLicenseScanPage: {screen: DriversLicenseScan},
    RulesPage: {screen: Rules},
    UserInfoPage: UserInfo,
    UserEditPage: {screen: UserEdit},
  },
  {
    initialRouteName: 'HomePage',
    mode: 'modal',
    headerMode: 'none',
  },
);
const UserStack = createStackNavigator(
  {
    UserInfoPage: UserInfo,
    UserEditPage: {screen: UserEdit},
  },
  {
    initialRouteName: 'UserInfoPage',
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
  // UserInfoPage: UserStack,
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
