import React, {useState} from 'react';

const UserStateContext = React.createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  return (
    <UserStateContext.Provider value={[user, setUser]}>
      {children}
    </UserStateContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUser must be used inside a UserProvider');
  }
  return context;
};
