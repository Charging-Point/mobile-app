import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function PhonePickupScreen({ route, navigation }) {
  const {id_locker, user_uid} = route.params;

  const updateLockerState = async () => {
    try {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
     const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({id_locker: id_locker, new_state : 0}), requestOptions);
     const json = await response.json();
     if (json.result == 1){
        navigation.navigate('ChoiceLetCharge', {id_locker: id_locker, user_uid: user_uid, deposit_time: json.deposit_time})
     }
     else {
        navigation.navigate('Error')
     }
   } catch (error) {
        console.error(error);
   } finally {
        setLoading(false);
   }
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Récupérez le casier dans le casier {id_locker}</Text>
        <Button
          title="C'est fait"
          onPress={updateLockerState}
        />
      </View>
    );
  }

  