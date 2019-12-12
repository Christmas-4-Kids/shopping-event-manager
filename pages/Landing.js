import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import {useUser} from '../contexts/user.context';
import DeviceInfo from 'react-native-device-info';

const Landing = props => {
  const [user, setUser] = useUser();
  const setUserType = type => {
    setUser({...user, type: type});
    props.navigation.navigate('AuthenticatePage');
  };
  // const deviceId = DeviceInfo.getUniqueId();
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUserType('Chaperone')}>
            <Text style={styles.buttonText}> Chaperone </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUserType('Organizer')}>
            <Text style={styles.buttonText}> Organizer </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUserType('Driver')}>
            <Text style={styles.buttonText}> Bus Driver </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Landing;
