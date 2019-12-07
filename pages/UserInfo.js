import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../styles';
import {useUser} from '../contexts/user.context';

const UserInfo = props => {
  const [user, setUser] = useUser();
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>User Information</Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainer}>
          <Text>Name</Text>
          <Text style={styles.sectionTitle}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text>Email</Text>
          <Text style={styles.sectionTitle}>{user.email}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text>Phone</Text>
          <Text style={styles.sectionTitle}>{user.phone}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('UserEditPage')}>
            <Text style={styles.buttonText}> Edit </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;
