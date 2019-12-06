import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import {useUser} from '../contexts/user.context';
import firestore from '@react-native-firebase/firestore';

const UserEdit = props => {
  const [user, setUser] = useUser();
  const updateUser = async user => {
    // get firebase user
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
      // update firebase user
      firestoreUser.FirstName = user.FirstName;
      firestoreUser.LastName = user.LastName;
      firestoreUser.Email = user.Email;
      firestoreUser.email_lower = user.Email.toLowerCase();
      firestoreUser.Phone = user.Phone;
      firestoreUser.LastUpdated = new Date();
      firestoreUser.type = user.type;
      setUser(firestoreUser);
      await firestore()
        .collection('members')
        .doc(firestoreUser.firestoreId)
        .update({
          FirstName: firestoreUser.FirstName,
          LastName: firestoreUser.LastName,
          Email: firestoreUser.Email,
          email_lower: firestoreUser.email_lower,
          Phone: firestoreUser.Phone,
          LastUpdated: firestoreUser.LastUpdated,
          type: firestoreUser.type,
          firestoreId: firestoreUser.firestoreId,
        });
    } else {
      setUser(user);
    }
    props.navigation.pop();
  };
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Update User Information</Text>
      </View>
      <Formik initialValues={user} onSubmit={values => updateUser(values)}>
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
                <Text style={styles.buttonText}> Save </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.pop()}>
                <Text style={styles.buttonText}> Cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UserEdit;
