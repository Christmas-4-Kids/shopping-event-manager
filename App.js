import React from 'react';
import {StatusBar} from 'react-native';
import {UserProvider} from './contexts/user.context';
import Main from './pages/Main';

const App = () => {
  return (
    <>
      <UserProvider>
        <StatusBar barStyle="dark-content" />
        <Main />
      </UserProvider>
    </>
  );
};

export default App;
