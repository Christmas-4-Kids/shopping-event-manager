import React from 'react';
import {StatusBar} from 'react-native';
import {UserProvider} from './contexts/user.context';
import Main from './pages/Main';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  return (
    <UserProvider>
      <StatusBar barStyle="light-content" />
      <Main />
    </UserProvider>
  );
};

export default App;
