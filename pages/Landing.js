import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';
import {useUser} from '../contexts/user.context';

const Landing = props => {
  const [user, setUser] = useUser();
  const setUserType = type => {
    setUser({...user, type: type});
    props.navigation.navigate('AuthenticatePage');
  };
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
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
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Landing;
