import { Button, StyleSheet, FlatList, TouchableOpacity, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import getValueFor from '../utils/getToken';

export default function FreeUpSpaceScreen({ navigation }) {
  const [currentIdLocker, setCurrentIdLocker] = useState("");
  const [freeIdParking, setFreeIdParking] = useState('');
  const [userUid, setUserUid] = useState('');
  const [actionToDo, setActionToDo] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const getMoves = async () => {
    try {
      const requestOptionsParking = {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+ getValueFor('token')},
        };
      const response_parking = await fetch('http://35.180.116.112:5000/parking', requestOptionsParking);
      const json_parking = await response_parking.json();
      if (json_parking.free_parking != 'null') {
        const requestOptionsLongStanding = {
            method: 'GET',
            headers: {'Authorization': 'Bearer '+ getValueFor('token')},
            };
        const response_long_standing = await fetch('http://35.180.116.112:5000/long-standing-device', requestOptionsLongStanding);
        const json_long_standing = await response_long_standing.json();
        if (json_long_standing.id_locker_long_standing != 'null') {
          setActionToDo(true);
          setFreeIdParking(json_parking.free_parking);
          setCurrentIdLocker(json_long_standing.id_locker_long_standing);
          setUserUid(json_long_standing.user_uid_long_standing)
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(() => {
    getMoves();
  });

  const changeDeviceSlot = async () => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getValueFor('token') },
      };
      const response_parking = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({ id_locker: freeIdParking, new_state: 1, user_uid: userUid }), requestOptions);
      const json_parking = await response_parking.json();
      if (json_parking.result == 1) {
        const response_locker = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({ id_locker: currentIdLocker, new_state: 0 }), requestOptions);
        const json_locker = await response_locker.json();
        if (json_locker.result == 1) {
          navigation.navigate('Home')
        }
        else {
          navigation.navigate('Error')
        }
      }
      else {
        navigation.navigate('Error')
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {actionToDo ? (
        <View>
          <Text>Récupérez le téléphone dans le casier {currentIdLocker} et placez le dans le parking {freeIdParking}</Text>
          <Button
            title="C'est fait"
            onPress={changeDeviceSlot}
          />
        </View>
      ) : <Text>Pas d'action à effectuer, revenez plus tard.</Text>
      }
      <View style={styles.space} />
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
});

