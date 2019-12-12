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
import AllDayChaperones from './AllDayChaperones';
import EveningChaperones from './EveningChaperones';
import LebanonChaperones from './LebanonChaperones';
import MembersHome from './MembersHome';
import Drivers from './Drivers';
import Schedule from './Schedule';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: '#112430',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const Main = () => {
  const MainTabs = createBottomTabNavigator({
    Home: Home,
    User: UserInfo,
  });
  const MainDrawer = createDrawerNavigator({
    MainTabs: MainTabs,
  });
  const HomeStack = createStackNavigator(
    {
      HomePage: Home,
      CheckInPage: {screen: CheckIn},
      DriversLicenseScanPage: {screen: DriversLicenseScan},
      MembersPage: {screen: MembersHome},
      AllDayChaperonesPage: {screen: AllDayChaperones},
      EveningChaperonesPage: {screen: EveningChaperones},
      LebanonChaperonesPage: {screen: LebanonChaperones},
      DriversPage: {screen: Drivers},
      RulesPage: {screen: Rules},
      SchedulePage: {screen: Schedule},
      UserInfoPage: UserInfo,
      UserEditPage: {screen: UserEdit},
    },
    {
      initialRouteName: 'HomePage',
      mode: 'modal',
      defaultNavigationOptions: defaultHeaderOptions,
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
      defaultNavigationOptions: defaultHeaderOptions,
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

  return (
    <View style={{flex: 1}}>
      <MainContainer />
    </View>
  );
};

export default Main;
