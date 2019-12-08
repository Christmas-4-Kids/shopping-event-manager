import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import {useUser} from '../contexts/user.context';
import firestore from '@react-native-firebase/firestore';

const Authenticate = props => {
  const [user, setUser] = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isFinished, setIsFinished] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (isAuthenticated && isFinished) {
      props.navigation.navigate('HomePage');
    } else if (!isAuthenticated && isFinished) {
      setErrorMessage(
        "Couldn't find a user registered with that email and phone number",
      );
    }
  }, [isFinished, isAuthenticated]);

  const authenticateOrganizer = values => {
    if (values.code === '8259') props.navigation.navigate('HomePage');
  };

  const authenticateUser = async user => {
    let firestoreUser = null;
    const querySnapshot = await firestore()
      .collection('members')
      .where('emailLower', '==', user.email.toLowerCase())
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
          firestoreUser.phone.replace(/\D/g, '') ===
          user.phone.replace(/\D/g, '')
        );
      });
      if (match.length === 1) {
        firestoreUser = match[0];
      }
    } else {
      firestoreUser = firestoreUserList[0];
    }

    if (firestoreUser) {
      // update firebase user
      firestoreUser.firstName = user.firstName;
      firestoreUser.lastName = user.lastName;
      firestoreUser.email = user.email;
      firestoreUser.emailLower = user.email.toLowerCase();
      firestoreUser.phone = user.phone;
      firestoreUser.lastUpdated = new Date();
      firestoreUser.type = user.type;
      setUser(firestoreUser);
      await firestore()
        .collection('members')
        .doc(firestoreUser.firestoreId)
        .update({
          firstName: firestoreUser.firstName,
          lastName: firestoreUser.lastName,
          email: firestoreUser.email,
          emailLower: firestoreUser.emailLower,
          phone: firestoreUser.phone,
          lastUpdated: firestoreUser.lastUpdated,
          type: firestoreUser.type,
          firestoreId: firestoreUser.firestoreId,
        });
      setIsAuthenticated(true);
      setIsFinished(true);
    } else {
      setIsAuthenticated(false);
      setIsFinished(true);
    }
  };

  return (
    <Formik
      initialValues={user}
      onSubmit={values =>
        user.type === 'Organizer'
          ? authenticateOrganizer(values)
          : authenticateUser(values)
      }>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.sectionContainer}>
          {user.type === 'Organizer' ? (
            <View>
              <Text>Code</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                value={values.code}
              />
            </View>
          ) : (
            <View>
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
            </View>
          )}
          {!!errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
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
