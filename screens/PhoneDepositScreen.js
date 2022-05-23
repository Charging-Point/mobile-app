import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function PhoneDepositScreen({ route, navigation }) {

    const {id_locker, user_uid} = route.params;

    const getPhoneAlreadyInCharge = async () => {
        try {
         const response = await fetch('http://35.180.116.112:5000/device?' + new URLSearchParams({user_uid: user_uid}));
         const json = await response.json();
         if (json.id_locker != 'null'){
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
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch('http://35.180.116.112:5000/locker?' + new URLSearchParams({id_locker: id_locker, new_state: 1, user_uid: user_uid}), requestOptions);
        const json = await response.json();
        if (json.result == 1){
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
        <Text>Déposez le téléphone dans le casier {id_locker}</Text>
        <View style={styles.space} />
        <Button
          title="C'est fait"
          onPress={updateLockerState}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    space: {
      width: 20,
      height: 20,
    },
  });

  