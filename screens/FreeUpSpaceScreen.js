import { Button, StyleSheet, FlatList, TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function FreeUpSpaceScreen({ navigation }) {
  const [currentIdLocker, setCurrentIdLocker] = useState("");
  const [freeIdParking, setFreeIdParking] = useState('');
  const [userUid, setUserUid] = useState('');
  const [actionToDo, setActionToDo] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  const getMoves = async () => {
    try {
      const response_parking = await fetch('http://35.180.116.112:5000/parking');
      const json_parking = await response_parking.json();
      if (json_parking.free_parking != 'null') {
        const response_long_standing = await fetch('http://35.180.116.112:5000/long-standing-device');
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
        headers: { 'Content-Type': 'application/json' },
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
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/arrowBack.png')} style={{ width: 25, height: 25 }} />
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 10 }}>Back</Text>
      </TouchableOpacity>
      <View style={{ flex: 6, paddingHorizontal: 40, marginTop: 70 }} >
        {actionToDo ? (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={styles.textDescription}>Récupérez le téléphone dans le casier </Text>
            <Text style={{ ...styles.numberText, color: '#3DAAF2' }}>{currentIdLocker}</Text>
            <Text style={styles.textDescription}>Placez le dans le parking</Text>
            <Text style={{ ...styles.numberText, }}>{freeIdParking}</Text>
            <TouchableOpacity style={styles.btnDone} onPress={changeDeviceSlot}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>C'est Fait</Text>
            </TouchableOpacity>
          </View>
        ) :
          <Text style={{ color: 'grey', fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>Aucune action à effectuer, revenez plus tard.</Text>
        }
      </View>
      <View style={styles.space} />
    </View >
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  textDescription: {
    textAlign: 'center', fontSize: 20, fontWeight: 'bold', width: '100%'
  },
  numberText: {
    textAlign: 'center', fontSize: 60, fontWeight: 'bold', width: '100%'
  },
  btnDone: {
    width: 180,
    height: 50,
    backgroundColor: 'rgba(1, 185, 63, 0.64)',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 40
  }
});

