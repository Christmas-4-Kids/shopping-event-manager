import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import {useUser} from '../contexts/user.context';

const Authenticate = props => {
  const [user, setUser] = useUser();
  const authenticateUser = user => {
    console.log('here');
    // verify with mailchimp info in firebase
    const isAuthenticated = true;
    if (isAuthenticated) {
      setUser(user);
      // move to home page with success message
      props.navigation.navigate('HomePage');
    } else {
      // go back to landing page with error message
    }
  };

  return (
    <Formik initialValues={user} onSubmit={values => authenticateUser(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.sectionContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
          />
          <Text>Last Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <Text>Phone</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Authenticate;
