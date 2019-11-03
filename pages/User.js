import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import {useUser} from '../contexts/user.context';

const User = () => {
  const [user, setUser] = useUser();
  const updateUser = user => {
    setUser(user);
    // display success message
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
                <Text style={styles.buttonText}> Save </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default User;
