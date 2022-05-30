import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import getValueFor from '../utils/getToken';

export default function PhoneDepositScreen({ route, navigation }) {

  const { id_locker, user_uid } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])
  const getPhoneAlreadyInCharge = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+ getValueFor('token')},
      }; 
      const response = await fetch('http://35.180.116.112:5000/device?' + new URLSearchParams({ user_uid: user_uid }), requestOptions);
      const json = await response.json();
      if (json.id_locker != 'null') {
        navigation.navigate('PhoneAlreadyInCharge')
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPhoneAlreadyInCharge();
  }, []);

  const updateLockerState = async () => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ getValueFor('token') },
      };
      const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({ id_locker: id_locker, new_state: 1, user_uid: user_uid }), requestOptions);
      const json = await response.json();
      if (json.result == 1) {
        navigation.navigate('Home')
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
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 50 }} >
        <Text style={{ fontSize: 15, fontWeight: '600', textAlign: 'center', color: '#5C5C5C', width: '100%' }}>Déposez le Téléphone dans le Casier : </Text>
        <Text style={{ fontSize: 70, fontWeight: '500', textAlign: 'center', color: '#3DAAF2', width: '100%' }}>{id_locker}</Text>
      </View>
      <TouchableOpacity style={styles.btnDone} onPress={updateLockerState}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%' }}>C'est Fait</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    width: 20,
    height: 20,
  },
  btnDone: {
    width: 180,
    height: 50,
    backgroundColor: 'rgba(1, 185, 63, 0.64)',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

