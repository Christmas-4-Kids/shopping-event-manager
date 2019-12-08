import React, {useReducer, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';
import styles from '../styles';
import firestore from '@react-native-firebase/firestore';
import call from 'react-native-phone-call';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faCheck, faMobile} from '@fortawesome/free-solid-svg-icons';

const MemberList = props => {
  const [memberList, setMemberList] = useState();
  useEffect(() => {
    let members = [];
    const unsubscribe = firestore()
      .collection('members')
      .orderBy('lastNameLower')
      .onSnapshot({
        error: e => console.error(e),
        next: querySnapshot => {
          querySnapshot.forEach(doc => {
            let d = doc.data();
            d.firestoreId = doc.id;
            members.push(d);
          });
          setMemberList(members);
        },
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const makeCall = number => {
    const args = {
      number: number, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch(console.error);
  };

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
              {!!memberList &&
                memberList.map(member => (
                  <View style={styles.member} key={member.firestoreId}>
                    <View style={styles.memberRow}>
                      <View style={styles.memberColumn}>
                        <Text style={styles.memberName}>
                          {member.firstName} {member.lastName}
                        </Text>
                        <Text style={styles.memberAddress}>
                          {!!member.driversLicense &&
                            member.driversLicense.address}
                        </Text>
                      </View>
                      <View>
                        {member.type && (
                          <FontAwesomeIcon
                            icon={faMobile}
                            size={25}
                            color={'green'}
                          />
                        )}
                        {!member.type && (
                          <FontAwesomeIcon
                            icon={faMobile}
                            size={25}
                            color={'lightgray'}
                          />
                        )}
                      </View>
                      <View>
                        {member.verified && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            size={30}
                            color={'green'}
                          />
                        )}
                        {!member.verified && (
                          <FontAwesomeIcon
                            icon={faTimes}
                            size={30}
                            color={'red'}
                          />
                        )}
                      </View>
                      <View>
                        <Button
                          title="Call"
                          onPress={() =>
                            makeCall(member.phone.replace(/\D/g, ''))
                          }
                        />
                      </View>
                    </View>
                  </View>
                ))}
              {!memberList && (
                <View style={styles.sectionContainer}>
                  <Text style="textAlign: 'center'">Loading...</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberList;
