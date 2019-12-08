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

const Home = props => {
  const [user, setUser] = useUser();
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            {user.type === 'Chaperone' && (
              <View style={styles.sectionContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => props.navigation.navigate('CheckInPage')}>
                  <Text style={styles.buttonText}> Check In </Text>
                </TouchableOpacity>
              </View>
            )}
            {user.type === 'Organizer' && (
              <View>
                <View style={styles.sectionContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      props.navigation.navigate('DriversLicenseScanPage')
                    }>
                    <Text style={styles.buttonText}>
                      Verify Driver's License
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.sectionContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('MemberListPage')}>
                    <Text style={styles.buttonText}>View Chaperones</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('RulesPage')}>
                <Text style={styles.buttonText}> Read Rules </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
