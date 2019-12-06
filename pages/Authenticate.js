import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import {useUser} from '../contexts/user.context';
import firestore from '@react-native-firebase/firestore';

const Authenticate = props => {
  const [user, setUser] = useUser();
  let isAuthenticated = false;
  const authenticateUser = async user => {
    let firestoreUser = null;
    const querySnapshot = await firestore()
      .collection('members')
      .where('email_lower', '==', user.Email.toLowerCase())
      .get();
    const firestoreUserList = [];
    querySnapshot.forEach(doc => {
      let d = doc.data();
      d.firestoreId = doc.id;
      firestoreUserList.push(d);
    });
    if (firestoreUserList.length > 1) {
      const match = firestoreUserList.filter(firestoreUser => {
        return (
          firestoreUser.Phone.replace(/\D/g, '') ===
          user.Phone.replace(/\D/g, '')
        );
      });
      if (match.length === 1) {
        firestoreUser = match[0];
      }
    } else {
      firestoreUser = firestoreUserList[0];
    }

    if (firestoreUser) {
      isAuthenticated = true;
    }
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
            onChangeText={handleChange('FirstName')}
            onBlur={handleBlur('FirstName')}
            value={values.FirstName}
          />
          <Text>Last Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('LastName')}
            onBlur={handleBlur('LastName')}
            value={values.LastName}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('Email')}
            onBlur={handleBlur('Email')}
            value={values.Email}
          />
          <Text>Phone</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={handleChange('Phone')}
            onBlur={handleBlur('Phone')}
            value={values.Phone}
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
