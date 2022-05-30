import getValueFor from '../utils/getToken';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';

export default function ChoiceLetChargeScreen({ route, navigation }) {
  const { id_locker, user_uid, deposit_time } = route.params;

  const phoneRetrieved = async () => {
      try {
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getValueFor('token') },
              body: JSON.stringify({ id_locker: id_locker, user_uid: user_uid, deposit_time: deposit_time })
          };
          const response = await fetch('http://35.180.116.112:5000/charge', requestOptions);
          const json = await response.json();
          if (json.result == 1){
              navigation.navigate('Home')
          } else {
              navigation.navigate('Error')
          }
     } catch (error) {
          console.error(error);
     }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])

  const letCharge = async () => {
      try {
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getValueFor('token') },
              body: JSON.stringify({ id_locker: id_locker, user_uid: user_uid, deposit_time: deposit_time })
          };
          const response = await fetch('http://35.180.116.112:5000/charge', requestOptions);
          const json = await response.json();
          if (json.result == 1){
              navigation.navigate('Connector')
          } else {
              navigation.navigate('Error')
          }
     } catch (error) {
          console.error(error);
     }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 200 }}>
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500', width: '100%' }}>Après Récupération :</Text>

      </View>
      <View style={{ flex: 6 }}>

        <TouchableOpacity style={{ ...styles.btnAction, backgroundColor: 'rgba(255, 67, 7, 0.26)', marginBottom: 30 }} onPress={letCharge}>
          <Image source={require('../assets/images/noCharge.png')} style={{ height: 40, width: 40 }} />
          <Text style={{ textAlign: 'center', color: '#3E3E3E', fontSize: 15, fontWeight: '800', width: '100%' }}>Laisser Charger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.btnAction, backgroundColor: 'rgba(4, 188, 66, 0.23)' }} onPress={phoneRetrieved}>
          <Image source={require('../assets/images/valid.png')} style={{ height: 40, width: 40 }} />
          <Text style={{ textAlign: 'center', color: '#3E3E3E', fontSize: 15, fontWeight: '800', width: '100%' }}>Téléphone rendu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  btnAction: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 120,
    height: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'center'
  }
});