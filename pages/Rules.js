import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';
import styles from '../styles';
import firestore from '@react-native-firebase/firestore';

const Rules = props => {
  const [rules, setRules] = useState();
  useEffect(() => {
    let ruleList = [];
    const unsubscribe = firestore()
      .collection('rules')
      .orderBy('order')
      .onSnapshot({
        error: e => console.error(e),
        next: querySnapshot => {
          querySnapshot.forEach(doc => {
            let d = doc.data();
            d.id = doc.id;
            ruleList.push(d);
          });
          setRules(ruleList);
        },
      });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.nativeCloseContainer}>
        <Button
          style={styles.nativeClose}
          onPress={() => props.navigation.pop()}
          title="Close"
        />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={{flex: 1}}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {!!rules &&
                rules.map(rule => (
                  <View style={styles.sectionContainer} key={rule.id}>
                    <Text style={styles.sectionTitle}>{rule.title}</Text>
                    <Text style={styles.sectionDescription}>
                      {rule.description}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rules;
