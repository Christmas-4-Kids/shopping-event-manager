import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';

const DriversLicenseScan = props => {
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
                onPress={() => props.navigation.pop()}>
                <Text style={styles.buttonText}> Close </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriversLicenseScan;
